const urlBase = 'http://ec2-18-189-157-67.us-east-2.compute.amazonaws.com:8080';

export default class Requisitions {
  static async login(cpf, cgp) {
    const url = `${urlBase}/v1/membros/cpf/${cpf}/cgp/${cgp}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;',
        },
      });
      return response;
    } catch (error) {
      return error;
      // throw new Error(`${error}`);
    }
  }

  static async listNovidade() {
    const url = `${urlBase}/v1/notificacoes`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;',
        },
      });
      return response;
    } catch (error) {
      return error;
      // throw new Error(`${error}`);
    }
  }

  static async membro(cpf, cgp) {
    const url = `${urlBase}/v1/membros/${cpf}/${cgp}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;',
        },
      });
      debugger;
      return response;
    } catch (error) {
      return error;
      // throw new Error(`${error}`);
    }
  }

  static async sendMail(body) {
    const url = `${urlBase}/v1/email`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;',
        },
        body,
      });
      debugger;
      return response;
    } catch (error) {
      return error;
      // throw new Error(`${error}`);
    }
  }
}

