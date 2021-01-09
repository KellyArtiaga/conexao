import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Home',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Home',
        type: 'item',
        icon: 'fa fa-home',
        url: '/dashboard/default'
      }
    ]
  },
  {
    id: 'contratos',
    title: 'Contratos',
    type: 'group',
    icon: 'icon-user',
    children: [
      {
        id: 'operadores-contrato',
        title: 'Operadores',
        type: 'item',
        icon: 'fa fa-users',
        url: '/cadastro/operadores'
      },
      {
        id: 'empresas-contrato',
        title: 'Empresas',
        type: 'item',
        icon: 'fas fa-building ',
        url: '/cadastro/empresas'
      }
    ]
  },
  {
    id: 'cadastro',
    title: 'Gestão de Acessos',
    type: 'group',
    icon: 'icon-user',
    children: [
      {
        id: 'usuarios',
        title: 'Usuários',
        type: 'item',
        icon: 'fa fa-circle  fa-user ',
        url: '/cadastro/usuarios'
      },
      {
        id: 'entregadores',
        title: 'Entregadores',
        type: 'item',
        icon: 'fa fa-circle fa-motorcycle ',
        url: '/cadastro/entregadores'
      },
      {
        id: 'skills',
        title: 'Skills',
        type: 'item',
        icon: 'fa fa-brain',
        url: '/cadastro/skills'
      }
    ]
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
