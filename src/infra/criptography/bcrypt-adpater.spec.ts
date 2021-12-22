import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adpter';

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value',salt)
  })

  test('Should return a hash onm success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
        return await new Promise((resolve, reject) => reject(new Error()))
    }) 
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})