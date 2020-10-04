class LoginPage {
  constructor() {
    this.URL = "login";
    this.passwordInput = () => bd.findElement(By.name("password"));
    this.usernameInput = () => bd.findElement(By.name("email"));
    this.submitBtn = () => bd.findElement(By.css("[data-testid='submit_btn']"));
  }

  /**
   * inputs password
   * @param {string} password
   * @return {promise}
   *
   */
  async typePassword(_password) {
    let passwordBox = this.passwordInput();
    await passwordBox.clear();
    return await passwordBox.sendKeys(_password);
  }

  /**
   * inputs username
   * @param {string} username
   * @return {promise}
   *
   */
  async typeUsername(_username) {
    let usernameBox = this.usernameInput();
    await usernameBox.clear();
    return await usernameBox.sendKeys(_username);
  }

  /**
   * submits the login form
   * @return {promise}
   */
  async submitLogin() {
    bd.sleep(100); //Form sometimes submits before browser detects password input !?
    return await this.submitBtn().click();
  }
}

export default new LoginPage();
