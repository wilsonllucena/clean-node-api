import { EmailValidator } from '../presentation/protocols/email-validator'

export class EmailValidatorAdapater implements EmailValidator {
  isValid (email: string): boolean {
    return false
  };
}
