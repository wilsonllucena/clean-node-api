import * as bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter';
export class BcryptAdapter implements Encrypter {
    private readonly salt: number;
    constructor(salt: number){
        this.salt = salt;
    }
   async encrypt(encrypter: string): Promise<string> {
    const hash = await bcrypt.hash(encrypter, this.salt)   
    return hash;
   }
}