import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account-mongo-repository";

describe('Account Mongo Repositoy', () => {
    
    //Connecta no banco quando iniciar os testes
    beforeAll(async () => {
       await MongoHelper.connect(process.env.MONGO_URL)
    })

    //Desconnecta do banco no final dos testes
    afterAll(async () => {
        await MongoHelper.disconnect();
    })

    //Limpar tabelas no teste
    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection('accounts');
        await accountCollection.deleteMany({});
    })

    const makeSut = (): AccountMongoRepository => {
        return new AccountMongoRepository();
    }
  test('Should return an account on sucess', async () => {
    const sut = makeSut()
    const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
    })

    // Como não sabe onumero do id que será gerado pelo mongodb, separar validações
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
