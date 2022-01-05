import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adpter";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account-mongo-repository";
import { SignUPController } from "../../presentation/controllers/signup/SignUPController";
import { Controller } from "../../presentation/protocols";
import { EmailValidatorAdapater } from "../../utils/email-validator-adpater";
import { LogControllerDecorator } from "../decorators/log";

export const makeSignUpController = (): Controller => {
    const salt = 12;
    const emailValidatorAdapter = new EmailValidatorAdapater();
    const bcrypterAdapter = new BcryptAdapter(salt);
    const addAccountRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcrypterAdapter, addAccountRepository)
    const signUPController = new SignUPController(emailValidatorAdapter, dbAddAccount);
    return new LogControllerDecorator(signUPController);
}