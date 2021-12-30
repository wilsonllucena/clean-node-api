import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeSignUpController } from '../factories/signupfactory'

export default (router: Router ): void => {
    router.post('/signup',adaptRoute(makeSignUpController()))
}