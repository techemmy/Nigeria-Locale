import { Request } from 'express'

export interface SwaggerDocRequest extends Request {
  swaggerDoc?: string
}
