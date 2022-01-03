import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUP Routes', () => {
    //Connecta no banco quando iniciar os testes
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });

    //Desconnecta do banco no final dos testes
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    //Limpar tabelas no teste
    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection("accounts");
        await accountCollection.deleteMany({});
    });
    test('Should return an account on success', async () => {
        await request(app).post('/api/signup')
            .send({
                name: 'Wilson',
                email: 'wilson@email.com',
                password: '123',
                passwordConfirmation: '123'
            })
            .expect(200)
    })
})
