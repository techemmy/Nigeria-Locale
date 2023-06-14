import app from '../../../../src/app'
import request from 'supertest'
import { cleanUp, connectDB, disconnectDB } from '../../../test.db'
import users from '../../../fixtures/users.json'
import jwt from 'jsonwebtoken'
import config from '../../../../src/app/config'

const PATH = '/api/v1/get-new-key'
let loginToken: string

beforeAll(async () => {
  await connectDB()
  loginToken = (await request(app).post('/auth/signup').send(users[0])).body
    .data.loginToken
})

afterAll(async () => {
  await cleanUp()
  await disconnectDB()
})

describe(`GET ${PATH}`, () => {
  test('should generate a new API key for user successfully', async () => {
    const response = await request(app)
      .get(PATH)
      .set('Authorization', `Bearer ${loginToken}`)

    expect(response.status).toBe(201)
  })

  test('should generate a new API key with a valid json response', async () => {
    const response = await request(app)
      .get(PATH)
      .set('Authorization', `Bearer ${loginToken}`)

    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
    expect(response.body.success).toBeTruthy()
    expect(response.body.message).toBeDefined()
    expect(response.body.data.APIKey).toBeDefined()
    expect(response.headers['content-type']).toContain('application/json')
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
