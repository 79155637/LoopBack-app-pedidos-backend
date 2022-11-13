import {service} from '../../node_modules/@loopback/core';
import {UserProfile} from '@loopback/security';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {AuthenticationStrategy} from '@loopback/authentication';
import parseBearerToken from 'parse-bearer-token';
import {HttpErrors, Request} from '@loopback/rest';
import {AutenticacionService} from '../services/autenticacion.service';


export class EstrategiaAdministrador implements AuthenticationStrategy{
  name : string = 'admin';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService
  ){}
  async authenticate(request : Request): Promise<UserProfile | undefined>{
    let token = parseBearerToken(request);
    if (token){
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
      if(datos){
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;
      }else{
        throw new HttpErrors[401]("El TOKEN incluido NO es VALIDO.")
      }
    }else{
      throw new HttpErrors[401]("No se ha incluido un token en la solicitud.")
    }

  }
}
