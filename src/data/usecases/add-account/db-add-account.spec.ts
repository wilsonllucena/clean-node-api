import { DbAddAccount } from './db-add-account'

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypted with correct password', async () => {
    class EncryptStup {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encrypterStub = new EncryptStup()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_name@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
