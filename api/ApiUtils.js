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
   * Creates header object with jwt auth
   * @param {string} token
   * @return {request header}
   */
  setHeaders(_token) {
    return {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    };
  }

  /**
   * #######################################
   *              Technologies
   * #######################################
   */

  /**
   * Gets all technologies
   * @method GET
   * @param {string} _token
   * @returns {response object}
   */
  async getTechnologies(_token) {
    try {
      let response = await axios.get(
        `${this.API_BASE}technologies/all`,
        this.setHeaders(_token)
      );
      return response;
    } catch (e) {
      return e.response;
    }
  }

  async createNewTechnology(_token, _technologyTitle) {
    try {
      let response = await axios.post(
        `${this.API_BASE}technologies/technology`,
        {
          technology_title: _technologyTitle,
        },
        this.setHeaders(_token)
      );
      return response;
    } catch (e) {
      return e.response;
    }
  }

  async editExistingTechnology(_token, _technologyId, _technologyTitle) {
    try {
      let response = await axios.put(
        `${this.API_BASE}technologies/technology/${_technologyId}`,
        {
          technology_title: _technologyTitle,
        },
        this.setHeaders(_token)
      );
      return response;
    } catch (e) {
      return e.response;
    }
  }

  async deleteExistingTechnology(_token, _technologyId) {
    try {
      let response = await axios.delete(
        `${this.API_BASE}technologies/technology/${_technologyId}`,
        this.setHeaders(_token)
      );
      return response;
    } catch (e) {
      return e.response;
    }
  }
}

export default new ApiUtils();
