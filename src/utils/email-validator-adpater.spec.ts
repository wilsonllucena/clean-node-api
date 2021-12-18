import { EmailValidatorAdapater } from './email-validator-adpater'
import validator from 'validator'

describe('EmailValidator Adapater', () => {
  test('should return false if validator return false', () => {
    const sut = new EmailValidatorAdapater()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return true if validator return true', () => {
    const sut = new EmailValidatorAdapater()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  test('should call validator with email correct', () => {
    const sut = new EmailValidatorAdapater()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
