import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor() { }

  private isAuthenticated: boolean = true;

  public roles = ["ROLE_MASTER", "ROLE_OPERADOR_ADMIN", "ROLE_OPERADOR_MANAGER", "ROLE_EMPRESA", "ROLE_COOPERADO"]

  private permissionTypes: any[][] = [
    // Ordem relativa a this.roles
    ["wrx", "", "", "", ""],
    ["wrx", "wrx", "", "", ""],
    ["wrx", "wr", "", "", ""],
    ["wrx", "wr", "wr", "", ""],
    ["wrx", "wr", "wr", "r", ""],
    ["wrx", "", "", "", "wr"],
  ];
  private routePermissions = {
    // Completo para a navbar
    "/cadastro/usuarios": this.permissionTypes[2],
    "/cadastro/usuarios/novo": this.permissionTypes[2],
    "/cadastro/usuarios/editar/:id": this.permissionTypes[2],

    "/cadastro/operadores": this.permissionTypes[0],
    "/cadastro/operadores/novo": this.permissionTypes[0],
    "/cadastro/operadores/editar/:operadorId/modulos/novo": this.permissionTypes[0],
    "/cadastro/operadores/editar/:operadorId/modulos/editar/:id": this.permissionTypes[0],
    "/cadastro/operadores/editar/:id": this.permissionTypes[0],

    "/cadastro/empresas": this.permissionTypes[1],
    "/cadastro/empresas/novo": this.permissionTypes[1],
    "/cadastro/empresas/editar/:id": this.permissionTypes[1],
    "/cadastro/empresas/editar/:empresaId/modulos/novo": this.permissionTypes[1],
    "/cadastro/empresas/editar/:empresaId/modulos/editar/:id": this.permissionTypes[1],
    "/cadastro/empresas/editar/:empresaId/modulos/editar/:moduloId/precificacao/novo": this.permissionTypes[1],
    "/cadastro/empresas/editar/:empresaId/modulos/editar/:moduloId/precificacao/editar/:id": this.permissionTypes[1],

    "/cadastro/entregadores": this.permissionTypes[3],
    "/cadastro/entregadores/novo": this.permissionTypes[3],
    "/cadastro/entregadores/editar/:id": this.permissionTypes[3],
    "/cadastro/entregadores/editar/:id/veiculos/novo": this.permissionTypes[3],
    "/cadastro/entregadores/editar/:id/veiculos/editar/:veiculoId": this.permissionTypes[3],

    '/cadastro/skills': this.permissionTypes[0],
    "/cadastro/skills/novo": this.permissionTypes[0],
    "/cadastro/skills/editar/:id": this.permissionTypes[0],

    // IMPORTANTE MUDAR AQUI TAMBEM
    // Abreviado para os *-routing.module.ts
    "usuarios": this.permissionTypes[2],
    "usuarios/novo": this.permissionTypes[2],
    "usuarios/editar/:id": this.permissionTypes[2],

    "operadores": this.permissionTypes[0],
    "operadores/novo": this.permissionTypes[0],
    "operadores/editar/:operadorId/modulos/novo": this.permissionTypes[0],
    "operadores/editar/:operadorId/modulos/editar/:id": this.permissionTypes[0],
    "operadores/editar/:id": this.permissionTypes[0],

    "empresas": this.permissionTypes[1],
    "empresas/novo": this.permissionTypes[1],
    "empresas/editar/:id": this.permissionTypes[1],
    "empresas/editar/:empresaId/modulos/novo": this.permissionTypes[1],
    "empresas/editar/:empresaId/modulos/editar/:id": this.permissionTypes[1],
    "empresas/editar/:empresaId/modulos/editar/:moduloId/precificacao/novo": this.permissionTypes[1],
    "empresas/editar/:empresaId/modulos/editar/:moduloId/precificacao/editar/:id": this.permissionTypes[1],

    "entregadores": this.permissionTypes[3],
    "entregadores/novo": this.permissionTypes[3],
    "entregadores/editar/:id": this.permissionTypes[3],
    "entregadores/editar/:id/veiculos/novo": this.permissionTypes[3],
    "entregadores/editar/:id/veiculos/editar/:veiculoId": this.permissionTypes[3],

    "skills": this.permissionTypes[0],
    "skills/novo": this.permissionTypes[0],
    "skills/editar/:id": this.permissionTypes[0],
  }



  getPermissions(route: string) : string  {
    let roleIndex = this.getRoleIndex();
    return this.routePermissions[route][roleIndex]; // "wrx"
  }

  getRoleIndex(): number {
    let result = atob(localStorage.getItem('tipoUsuario'))
    let index = this.roles.indexOf(result);
    return index;
  }

  canRead(route: string) : boolean {
    if (!this.routePermissions[route]) {
      return true;
    }
    return this.getPermissions(route).indexOf('r') !== -1;
  }
  canWrite(route: string): boolean {
    if (!this.routePermissions[route]) {
      return false;
    }
    return this.getPermissions(route).indexOf('w') !== -1;
  }
  canDelete(route: string): boolean {
    if (!this.routePermissions[route]) {
      return false;
    }
    return this.getPermissions(route).indexOf('x') !== -1;
  }

  canActivate(route: any) {
    console.log(route)
    if (typeof route == "string") {
      return this.canRead(route);
    }
    else {
      return this.canRead(route.routeConfig.path);
    }
  }

}
