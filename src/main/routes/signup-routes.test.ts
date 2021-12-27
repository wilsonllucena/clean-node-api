import request from 'supertest'
import app from '../config/app'

describe('SignUP Routes', () => {
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
