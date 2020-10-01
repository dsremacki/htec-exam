class LoginPage {
  constructor() {
    this.URL = "login";
    //For ng sites we can use element instead of driver.findElement
    // this.usernameBox = bd.findElement(By.css("input[name='email']"));
    // this.passwordBox = bd.findElement(By.name("password"));
    // this.submitBtn = bd.findElement(By.css("[data-testid='submit_btn']"));
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
    return await submitBtn.click();
  }
}

export default new LoginPage();
