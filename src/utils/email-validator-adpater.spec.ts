import { EmailValidatorAdapater } from './email-validator-adpater'

describe('EmailValidator Adapater', () => {
  test('should return false if validator return false', () => {
    const sut = new EmailValidatorAdapater()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
