import { Component, OnInit } from '@angular/core';
import { EmailPost } from 'src/app/demo/models/email.model';

@Component({
  selector: 'app-emails-structure',
  templateUrl: './emails-structure.component.html',
  styleUrls: ['./emails-structure.component.scss']
})
export class EmailsStructureComponent {

  constructor() { }

  public static FirstAcessEmail(obj?: any) {
    const email: EmailPost = {};
    email.from = `noreply@unidas.com.br`;
    email.to = [obj.login];
    email.subject = `Primeiro acesso`;

    email.html = '<html><head></head><body style="margin:0; padding:0; ">';
    email.html += '<div style="width: 100%; height : 100vh; margin-bottom : .5em; table-layout: fixed; background:#f5f5f5; text-align: center; font-size:12px" >';
    email.html += '<table style="display: inline-table; background:#FFFFFF; border:0;cellpadding:0; cellspacing:0; max-width:600px; margin:15px; padding :15px;" >';
    email.html += '<tr style="text-align: center" >';
    email.html += '<td style="text-align: left" valign = "top" >';
    email.html += '<div style="padding-right:15px; padding-left:15px" >';
    email.html += '<p style="margin-bottom:20px" > <b>Prezado, cliente! < /b></p >';
    email.html += '<p>Você foi cadastrado com sucesso no Conexão Delivery! < /p>';
    email.html += '< p > Geramos uma senha automática para o seu primeiro acesso no sistema.Seguem os dados: </p>';
    email.html += '< div style = "background: #f5f5f5; padding: 10px; margin: 15px; border-radius: 6px;" >';
    email.html += '<p>Email: { { login } } </p>';
    email.html += '< p > Senha: { { senha } } </p>';
    email.html += '< /div>';
    email.html += '< p > Ps: Essa senha terá duração de { { duração } } dias.< /p>';
    email.html += '< /div>';
    email.html += '< /td>';
    email.html += '< /tr>';
    email.html += '< tr style = "text-align: center" >';
    email.html += '<td>';
    email.html += '<button style="background: #5E36F6; padding: 10px; margin: 15px; border-radius: 15px;height: 30px; width:100%; border:none; color: #fff;display: flex;';
    email.html += 'align - items: center; text - align: center; justify - content: center">';
    email.html += 'Acesse o Conexão';
    email.html += '< /button>';
    email.html += ' < /td>';
    email.html += '< /tr>';
    email.html += '< tr style = "text-align: center" >';
    email.html += '</td>';
    email.html += '<td valign="top" >';
    email.html += '<div style="padding-right:15px; padding-left:15px">';
    email.html += '<p style="margin-bottom:20px"><b>Atenciosamente, Conexão Delivery Team</b></p>';
    email.html += '</div>';
    email.html += '</td>';
    email.html += '</tr>';
    email.html += '</table>';
    email.html += '</div>';
    email.html += '</body></html>';

    return email;
  }

}
