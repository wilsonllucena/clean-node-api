import { SignUPController } from './SignUPController'

describe('SignUp controller', () => {
  test('should return 400 if no nmae is provided', () => {
    const sut = new SignUPController()

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
