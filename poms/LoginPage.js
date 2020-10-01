class LoginPage {
  constructor() {
    this.URL = "login";
  }

  /**
   * inputs password
   * @param {string} password
   * @return {promise}
   *
   */
  async typePassword(_password) {
    let passwordBox = await bd.findElement(By.name("password"));
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
    let usernameBox = await bd.findElement(By.name("email"));
    await usernameBox.clear();
    return await usernameBox.sendKeys(_username);
  }

  /**
   * submits the login form
   * @return {promise}
   */
  async submitLogin() {
    let submitBtn = await bd.findElement(By.css("[data-testid='submit_btn']"));
    bd.sleep(100); //Form sometimes submits before browser detects password input !?
    return await submitBtn.click();
  }
}

export default new LoginPage();
