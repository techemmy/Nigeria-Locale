import app from '../../../../src/app'
import request from 'supertest'
import { cleanUp, connectDB, disconnectDB } from '../../../test.db'

import users from '../../../fixtures/users.json'
import userModel from '../../../../src/app/models/user.model'

beforeAll(async () => {
  await connectDB()
  await userModel.create(users[0])
})

afterAll(async () => {
  await cleanUp()
  await disconnectDB()
})

describe('POST /auth/login', () => {
  const { username, password } = users[0]

  test('should log user in successfully', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username, password })
    expect(response.status).toBe(200)
  })

  test('should log user in with a valid json response', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username, password })
    expect(response.body.success).toBeTruthy()
    expect(response.body.data.loginToken).toBeDefined()
    expect(response.headers['content-type']).toContain('application/json')
  })
})
