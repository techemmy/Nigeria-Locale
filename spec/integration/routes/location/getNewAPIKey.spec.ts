import app from '../../../../src/app'
import request from 'supertest'
import { cleanUp, connectDB, disconnectDB } from '../../../test.db'
import users from '../../../fixtures/users.json'
import jwt from 'jsonwebtoken'
import config from '../../../../src/app/config'

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await cleanUp()
  await disconnectDB()
})

const PATH = '/api/v1/get-new-key'

describe(`GET ${PATH}`, () => {
  test('should generate a new API key for user successfully', async () => {
    const loginToken = (await request(app).post('/auth/signup').send(users[0]))
      .body.data.loginToken

    const response = await request(app)
      .get(PATH)
      .set('Authorization', `Bearer ${loginToken}`)

    expect(response.status).toBe(201)
  })

  test('should fail to generate API key if no auth header is found', async () => {
    const response = await request(app).get(PATH)
    expect(response.status).toBe(401)
  })

  test('should fail to generate API key if invalid data jwt is found in auth header', async () => {
    const randomToken = jwt.sign({ test: 'it works! :)' }, config.JWT_Secret)
    const response = await request(app)
      .get(PATH)
      .set('Authorization', `Bearer ${randomToken}`)
    expect(response.status).toBe(401)
  })
})
