import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import userModel, { IUser } from '../models/user.model'
import { HydratedDocument } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nigeriaLocations, { NigeriaLocation } from 'nigeria-geo'
import { redisClient } from '../database'

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
    const regions: Set<string> = new Set(
      nigeriaLocations
        .all()
        .map((state: nigeriaLocations.State) => state.geo_politcal_zone)
    )

    return res.status(200).json({
      success: true,
      message: 'List of Regions',
      data: {
        size: regions.size,
        result: [...regions]
      }
    })
  } catch (error) {
    return next(error)
  }
}

export function getStates(req: Request, res: Response, next: NextFunction) {
  try {
    const states = nigeriaLocations.states()
    return res.status(200).json({
      success: true,
      message: 'List of States',
      data: {
        size: states.length,
        result: states
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

    return res.status(200).json({
      success: true,
      message: 'List of Local Government Areas (LGAs)',
      data: {
        size: LGAs.size,
        result: [...LGAs]
      }
    })
  } catch (error) {
    return next(error)
  }
}

export async function search(req: Request, res: Response, next: NextFunction) {
  const searchCategories = ['region', 'state', 'lga']
  const { category, query } = req.query as { category: string; query: string }

  try {
    // make sure category query from user is a valid one
    if (!searchCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Search Category',
        errorCode: 400,
        data: {}
      })
    }

    // it is used to hold data based on the user's category
    const filteredData: {
      region?: string
      state?: string
      lgas?: string[]
      lga?: string
      metadata?: nigeriaLocations.State
    }[] = []

    const states: nigeriaLocations.State[] = nigeriaLocations.all()

    // we push data into filteredData based on the user's category
    for (const state of states) {
      if (category === 'region') {
        filteredData.push({
          region: state.geo_politcal_zone,
          metadata: state
        })
      } else if (category === 'state') {
        filteredData.push({
          state: state.state,
          lgas: state.lgas,
          metadata: state
        })
      } else if (category === 'lga') {
        for (const lga of state.lgas) {
          filteredData.push({
            state: state.state,
            lga,
            metadata: state
          })
        }
      }
    }

    // then, we filter data based on the user's query on the category
    const lowercaseQuery = query.toLowerCase()
    const data = filteredData.filter(
      (item) =>
        item.region?.toLowerCase().includes(lowercaseQuery) ||
        item.state?.toLowerCase().includes(lowercaseQuery) ||
        item.lga?.toLowerCase().includes(lowercaseQuery)
    )

    const cacheData = {
      category,
      query,
      data: {
        size: data.length,
        result: data
      }
    }
    await redisClient.set(`${category}-${query}`, JSON.stringify(cacheData), {
      EX: 86400,
      NX: true
    })
    return res.status(200).json({
      success: true,
      message: 'Search results',
      data: cacheData.data
    })
  } catch (error) {
    return next(error)
  }
}
