import { LoginService } from 'src/app/demo/services/login.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { DattaConfig } from '../../../../../app-config';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public dattaConfig: any;
  public userName: string;
  public role: string;

  constructor(config: NgbDropdownConfig, loginService: LoginService) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.dattaConfig = DattaConfig.config;
    this.userName = loginService.getUserName();
    this.role = loginService.getTipoUsuario();
    this.changeRolesNames(this.role);
  }

  ngOnInit() {
  }


  changeRolesNames(obj?: any) {
    if (obj === 'ROLE_MASTER') {
      return 'Master';
    } else if (obj === 'ROLE_OPERADOR_ADMIN') {
      return 'Administrador';
    } else if (obj === 'ROLE_OPERADOR_MANAGER') {
      return 'Gerente';
    } else if (obj === 'ROLE_EMPRESA') {
      return 'Supervisor';
    } else if (obj === 'ROLE_COOPERADO') {
      return 'Cooperado';
    }
  }


  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('datta-rtl')) {
      this.dattaConfig['rtl-layout'] = true;
    } else {
      this.dattaConfig['rtl-layout'] = false;
    }
  }

  redirectToLogin() {
    localStorage.clear();
  }
}
