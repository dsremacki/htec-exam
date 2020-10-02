const axios = require("axios");

class ApiUtils {
  constructor() {
    this.API_BASE = "https://qa-sandbox.apps.htec.rs/api/";
  }

  async login(_email, _password) {
    try {
      let response = await axios.post(`${this.API_BASE}users/login`, {
        email: _email,
        password: _password,
      });
      return response;
    } catch (e) {
      return e.response;
    }
  }
}

export default new ApiUtils();
