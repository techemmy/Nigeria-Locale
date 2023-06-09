import app from '../../src/app'
import request from 'supertest'

test('app works at GET /', async () => {
  const response = await request(app).get('/')
  expect(response.status).toBe(200)
})
