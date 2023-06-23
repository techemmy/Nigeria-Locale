import app from '../../src/app'
import request from 'supertest'

describe('Make sure server starts and with the right configuration', () => {
  test('app server starts at GET /', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })

  test('app server returns the right content type', async () => {
    const response = await request(app).get('/')
    expect(response.headers['content-type']).toContain('text/html')
  })

  test('app server has default rate-limit set', async () => {
    const response = await request(app).get('/')
    expect(parseInt(response.headers['ratelimit-limit'])).toBe(100)
  })
})
