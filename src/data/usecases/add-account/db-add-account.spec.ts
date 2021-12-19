import { AccountModel, AddAccountModel, Encrypter, AddAccountRepository } from './db-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStup implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStup()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakerAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_name@mail.com',
        password: 'hashed_password'
      }
      return await new Promise(resolve => resolve(fakerAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAddAccountRepositoryStub: AddAccountRepository
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAddAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAddAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAddAccountRepositoryStub
  }
}
describe('DbAddAccount UseCase', () => {
  test('Should call Encrypted with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_name@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypted throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_name@mail.com',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAddAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAddAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_name@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_name@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if Encrypted throws', async () => {
    const { sut, addAddAccountRepositoryStub } = makeSut()
    jest.spyOn(addAddAccountRepositoryStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_name@mail.com',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      name: 'valid_name',
      email: 'valid_name@mail.com',
      password: 'valid_password'
    }
    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_name@mail.com',
      password: 'hashed_password'
    })
  })
})
