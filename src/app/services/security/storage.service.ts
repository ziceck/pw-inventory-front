import * as CryptoJS from 'crypto-js';
import { Jwt } from '@models/security';
import { CURRENT_USER } from '@shared/local-storage-keys';

/**
 * Manage encrypted data in local storage.
 */
export class StorageService {

  private readonly SECRET_KEY = 'Fj4Z@4l';

  constructor() {
  }

  /**
   * Cifra un string.
   * @param data, el dato que se desea cifrar.
   */
  public encrypt(data: string): string {
    const encryptData = CryptoJS.AES.encrypt(data, this.SECRET_KEY).toString();
    return encryptData;
  }

  /**
   * Desencripta un string.
   * @param data, el string que se desea decifrar.
   */
  public decrypt(data: string): string {
    const decryptData = CryptoJS.AES.decrypt(data, this.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptData;
  }

  /**
   * Obtiene el currentUser en localStorage y lo devuelve desencriptado.
   */
  public getCurrentUser(): Jwt {
    const local = localStorage.getItem(CURRENT_USER);
    return local ? JSON.parse(this.decrypt(local)) : local;
  }

  /**
   * Guarda un json de current user en localStorage de manera cifrada.
   * @param data, el json de jwt pero como string (se debe pasar haciendo uso de JSON.stringify)
   */
  public setCurrentUser(data: string): void {
    localStorage.setItem(CURRENT_USER, this.encrypt(data));
  }

}
