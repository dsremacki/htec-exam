class DashboardPage {
  constructor() {
    this.URL = "dashboard";
  }

  /**
   * logs the user out
   * @return {promise}
   *
   */
  async logout() {
    let logoutLink = await bd.findElement(
      By.css(".navbar-nav li:last-child a")
    );
    return await logoutLink.click();
  }
}

export default new DashboardPage();
