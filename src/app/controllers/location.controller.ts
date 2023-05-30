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

    return res.status(200).json({
      success: true,
      message: 'List of Regions',
      data: {
        regions: [...regions.values()]
      }
    })
  } catch (error) {
    return next(error)
  }
}
