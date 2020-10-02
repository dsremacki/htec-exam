const axios = require("axios");

class ApiUtils {
  constructor() {
    this.API_BASE = "https://qa-sandbox.apps.htec.rs/api/";
  }

  /**
   * Logs the user in
   * @method POST
   * @param {string} _email
   * @param {string} _password
   * @return {response object}
   */
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

  /**
   *
   * Technologies
   *
   */

  async getTechnologies(_token) {
    let reqConfig = {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    };
    try {
      let response = await axios.get(
        `${this.API_BASE}technologies/all`,
        reqConfig
      );
      return response;
    } catch (e) {
      return e.response;
    }
  }

  async createNewTechnology(_token, _technologyTitle) {
    let reqConfig = {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    };
    try {
      let response = await axios.post(
        `${this.API_BASE}technologies/technology`,
        {
          technology_title: _technologyTitle,
        },
        reqConfig
      );
      return response;
    } catch (e) {
      return e.response;
    }
  }
}

export default new ApiUtils();
