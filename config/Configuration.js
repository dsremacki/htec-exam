class Configuration {
  constructor() {
    this.BASE_URL = "https://qa-sandbox.apps.htec.rs/";

    this.TIMEOUT = {
      short: 1 * 1000,
      medium: 5 * 1000,
      long: 15 * 1000,
    };
    this.name = "Boris Grabovac";
    this.email = "grabovacb86@gmail.com";
    this.pass = "htec.htec123";
  }
}

export default new Configuration();
