
export  interface SkillsModel {
  "active": boolean,
  "deleted": boolean,
  "descricao": string,
  "id": number,
  "nome": string,
  "tenant": {
    "active": boolean,
    "cooperativeCode": string,
    "createdAt": string,
    "id": number,
    "lastUpdate": string,
    "name": string
  }
}
