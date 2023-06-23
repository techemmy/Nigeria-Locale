import { Response, NextFunction } from 'express'
import { SwaggerDocRequest } from '../typings/expressResponses'
import swaggerDocument from '../utils/loadSwaggerDocs.util'

export default function (
  req: SwaggerDocRequest,
  res: Response,
  next: NextFunction
) {
  swaggerDocument.host = req.get('host')
  req.swaggerDoc = swaggerDocument
  next()
}
