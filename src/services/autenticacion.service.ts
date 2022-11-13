/* eslint-disable @typescript-eslint/no-misused-promises */
import {repository} from '@loopback/repository';
/* eslint-disable @typescript-eslint/no-shadow */
import {Persona} from '../models/persona.model';
import {PersonaRepository} from '../repositories/persona.repository';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Llaves} from '../config/llaves';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository
  ) {}

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
  IdentificarPersona(usuario:string, clave: string){
    try{
      let p = this.personaRepository.findOne({where:{correo: usuario, clave: clave}});
      if(p){
        return p;
      }
    }catch{
      return false;
    }
  }

  GenerarTokenJWT(persona : Persona){
    let token = jwt.sign({
      data:{
        id: persona.id,
        correo : persona.correo,
        nombre: persona.nombres + " " + persona.apellidos
      }
    },
      Llaves.claveJWT);
    return token;
  }
   ValidarTokenJWT(token : string){
    try{
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    }catch{
      return false;
    }
  }
}
