import generateJWTLoginToken from '../../src/app/utils/generateJWTLoginToken.util'

test('should generate a token', () => {
  const token = generateJWTLoginToken('1', 'test')
  expect(token).toBeDefined()
  expect(token?.length).toBeGreaterThan(0)
})

test('should not generate a token if no valid userId is passed as an argument', () => {
  const token = generateJWTLoginToken(undefined, 'test')
  expect(token).toBeUndefined()
})

test('should not generate a token if no valid username is passed as an argument', () => {
  const token = generateJWTLoginToken('1', undefined)
  expect(token).toBeUndefined()
})

test('should not generate a token if no valid userId and username is passed as an argument', () => {
  const token = generateJWTLoginToken(undefined, undefined)
  expect(token).toBeUndefined()
})
