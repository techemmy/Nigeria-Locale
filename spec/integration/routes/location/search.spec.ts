import app from '../../../../src/app'
import request from 'supertest'
import { cleanUp, connectDB, disconnectDB } from '../../../test.db'
import users from '../../../fixtures/users.json'
import { connectRedis, disconnectRedis } from '../../../../src/app/database'
import nigeriaLocations from 'nigeria-geo'

const PATH = '/api/v1/search'
let APIKey: string
let localGovernmentAreas: string[]

beforeAll(async () => {
  await connectDB()
  await connectRedis()
  APIKey = (await request(app).post('/auth/signup').send(users[0])).body.data
    .userAPIKey
  localGovernmentAreas = nigeriaLocations
    .all()
    .flatMap((state: nigeriaLocations.State) => state.lgas)
})

afterAll(async () => {
  await disconnectRedis()
  await cleanUp()
  await disconnectDB()
})

describe(`GET ${PATH}`, () => {
  test('should search for a region based on query url parameter value', async () => {
    const response = await request(app)
      .get(PATH + `?category=region&query=South+East`)
      .set('X-Api-Key', `${APIKey}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBeTruthy()
    expect(response.body.data.size).toBeGreaterThan(0)
    expect(response.body.data.result).toBeDefined()
    expect(response.body.data.result[0].region).toBe('South East')
  })

  test('should search for a state based on query url parameter value', async () => {
    const response = await request(app)
      .get(PATH + `?category=state&query=Ondo`)
      .set('X-Api-Key', `${APIKey}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBeTruthy()
    expect(response.body.data.size).toBe(1)
    expect(response.body.data.result).toBeDefined()
    expect(response.body.data.result[0].state).toBe('Ondo')
  })

  test('should search for a local government area based on query url parameter value', async () => {
    const response = await request(app)
      .get(PATH + `?category=lga&query=${localGovernmentAreas[0]}`)
      .set('X-Api-Key', `${APIKey}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBeTruthy()
    expect(response.body.data.size).toBe(1)
    expect(response.body.data.result).toBeDefined()
    expect(response.body.data.result[0].lga).toBe(`${localGovernmentAreas[0]}`)
  })

  test('should fail to peform search if category url parameter is not found', async () => {
    const response = await request(app).get(PATH).set('X-Api-Key', `${APIKey}`)
    expect(response.status).toBe(400)
    expect(response.body.success).toBeFalsy()
    expect(response.body.errorCode).toBe(400)
    expect(response.body.data).toEqual({})
  })

  test('should return all the states if no query url paramter is passed on region category search', async () => {
    const response = await request(app)
      .get(PATH + `?category=region`)
      .set('X-Api-Key', `${APIKey}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBeTruthy()
    expect(response.body.data.size).toBe(nigeriaLocations.all().length)
    expect(response.body.data.result).toBeDefined()
  })

  test('should return all the states if no query url paramter is passed on state category search', async () => {
    const response = await request(app)
      .get(PATH + `?category=state`)
      .set('X-Api-Key', `${APIKey}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBeTruthy()
    expect(response.body.data.size).toBe(nigeriaLocations.all().length)
    expect(response.body.data.result).toBeDefined()
  })

  test('should return all the states if no query url paramter is passed on lga category search', async () => {
    const response = await request(app)
      .get(PATH + `?category=lga`)
      .set('X-Api-Key', `${APIKey}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBeTruthy()
    expect(response.body.data.size).toBe(localGovernmentAreas.length)
    expect(response.body.data.result).toBeDefined()
  })

  test('should fail to perform search operation if API Key is not sent in the header', async () => {
    const response = await request(app).get(PATH)
    expect(response.status).toBe(401)
    expect(response.body.success).toBeFalsy()
    expect(response.body.data.size).toBeUndefined()
    expect(response.body.data.result).toBeUndefined()
  })
})
