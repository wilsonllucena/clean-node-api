export interface Encrypter {
  encrypt (encrypter: string): Promise<string>
}
