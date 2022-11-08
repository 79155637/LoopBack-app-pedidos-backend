/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
/*import generador from 'password-generator';
import cryptoJS from 'crypto-js';*/
const generador = require('password-generator');
const cryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8, false);
    return clave;
  }
  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
}
