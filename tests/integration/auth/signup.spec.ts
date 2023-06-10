import app from '../../../src/app'
import request from 'supertest'
import { cleanUp, connectDB, disconnectDB } from '../../test.db'

const users = require('../../fixtures/users.json')

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await cleanUp()
  await disconnectDB()
})

describe('POST /auth/signup', () => {
  test('should create register user successfully', async () => {
    const response = await request(app).post('/auth/signup').send(users[0])
    expect(response.status).toBe(201)
  })

  test('should create register user successfully with a valid json response', async () => {
    const response = await request(app).post('/auth/signup').send(users[1])
    expect(response.status).toBe(201)
    expect(response.body.data.userAPIKey).toBeDefined()
    expect(response.body.data.loginToken).toBeDefined()
    expect(response.headers['content-type']).toContain('application/json')
  })

  test('should fail to create register user due to already existing user', async () => {
    const response = await request(app).post('/auth/signup').send(users[0])
    expect(response.status).toBe(400)
    expect(response.body.success).toBeFalsy()
    expect(response.body.errorCode).toBe(400)
    expect(response.body.data).toEqual({})
    expect(response.headers['content-type']).toContain('application/json')
  })

  test('should fail to create register user due to missing username', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ ...users[0], username: '' })
    expect(response.status).toBe(400)
    expect(response.body.success).toBeFalsy()
    expect(response.body.errorCode).toBe(400)
    expect(response.body.data).toEqual({})
    expect(response.headers['content-type']).toContain('application/json')
  })

  test('should fail to create register user due to missing password field', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ ...users[0], password: '' })
    expect(response.status).toBe(400)
    expect(response.body.success).toBeFalsy()
    expect(response.body.errorCode).toBe(400)
    expect(response.body.data).toEqual({})
    expect(response.headers['content-type']).toContain('application/json')
  })

  test('should fail to create register user due to missing email field', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ ...users[0], email: '' })
    expect(response.status).toBe(400)
    expect(response.body.success).toBeFalsy()
    expect(response.body.errorCode).toBe(400)
    expect(response.body.data).toEqual({})
    expect(response.headers['content-type']).toContain('application/json')
  })
})
