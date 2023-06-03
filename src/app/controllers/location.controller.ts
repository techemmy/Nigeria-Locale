import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import userModel, { IUser } from '../models/user.model'
import { HydratedDocument } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nigeriaLocations, { NigeriaLocation } from 'nigeria-geo'

export async function getNewAPIKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as HydratedDocument<IUser>
    const newAPIKey = await bcrypt.hash(user.username, 10)
    await userModel.findByIdAndUpdate(user.id, { APIKey: newAPIKey })
    return res.status(201).json({
      success: true,
      message: 'New Key Generated!',
      data: {
        APIKey: newAPIKey,
        Note: `Copy your key and save it. We won't show it to you again`
      }
    })
  } catch (error) {
    return next(error)
  }
}

export function getRegions(req: Request, res: Response, next: NextFunction) {
  try {
    const regions: Set<string> = new Set()

    for (const location of nigeriaLocations.all()) {
      regions.add(location.geo_politcal_zone)
    }

    const regionsArray = Array.from(regions)

    return res.status(200).json({
      success: true,
      message: 'List of Regions',
      data: {
        numberOfRegions: regionsArray.length,
        regions: regionsArray
      }
    })
  } catch (error) {
    return next(error)
  }
}

export function getStates(req: Request, res: Response, next: NextFunction) {
  try {
    const states: NigeriaLocation[] = nigeriaLocations.states()
    return res.status(200).json({
      success: true,
      message: 'List of States',
      data: {
        numberOfStates: states.length,
        states
      }
    })
  } catch (error) {
    return next(error)
  }
}

export function getLocalGovernmentArea(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const LGAs: Set<string> = new Set<string>(
      nigeriaLocations
        .all()
        .flatMap((state: nigeriaLocations.State) => state.lgas)
    )
    const sortedLGAs: string[] = Array.from(LGAs).sort()

    return res.status(200).json({
      success: true,
      message: 'List of Local Government Areas (LGAs)',
      data: {
        numberOfLGAs: sortedLGAs.length,
        LGAs: sortedLGAs
      }
    })
  } catch (error) {
    return next(error)
  }
}

export function search(req: Request, res: Response, next: NextFunction) {
  const searchCategories = ['region', 'state', 'lga']
  const { category, query } = req.query as { category: string; query: string }

  try {
    const isValidCategory = searchCategories.includes(category)
    if (!isValidCategory) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Search Category',
        errorCode: 400,
        data: {}
      })
    }

    const data: {
      region?: string
      state?: string
      lgas?: string[]
      lga?: string
      metadata?: nigeriaLocations.State
    }[] = []

    const states: nigeriaLocations.State[] = nigeriaLocations.all()

    if (category === 'region') {
      for (const state of states) {
        const region = state.geo_politcal_zone
        data.push({
          region,
          state: state.state,
          metadata: state
        })
      }
    } else if (category === 'state') {
      for (const state of states) {
        const lgas = state.lgas
        data.push({
          state: state.state,
          lgas,
          metadata: state
        })
      }
    } else if (category === 'lga') {
      for (const state of states) {
        for (const lga of state.lgas) {
          data.push({
            state: state.state,
            lga,
            metadata: state
          })
        }
      }
    }

    const filteredData = data.filter(
      (item) =>
        item.region?.toLowerCase().includes(query.toLowerCase()) ||
        item.state?.toLowerCase().includes(query.toLowerCase()) ||
        item.lga?.toLowerCase().includes(query.toLowerCase())
    )
    return res.status(200).json({
      success: true,
      message: 'Search results',
      dataSize: filteredData.length,
      data: filteredData
    })
  } catch (error) {
    return next(error)
  }
}
