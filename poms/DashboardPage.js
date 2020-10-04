const EC = protractor.ExpectedConditions;
import config from "../config/Configuration";
class DashboardPage {
  constructor() {
    this.URL = "dashboard";
    this.logoutLink = () =>
      bd.findElement(By.css(".navbar-nav li:last-child a"));
    this.profileLink = () =>
      bd.findElement(By.css("div[data-testid='profile_card_id'] div a"));
    this.useCasesLink = () =>
      bd.findElement(By.css("div[data-testid='use_cases_card_id'] div a"));
  }

  /**
   * logs the user out
   * @return {promise}
   *
   */
  async logout() {
    return await this.logoutLink().click();
  }

  async goToProfile() {
    await bd.wait(
      EC.presenceOf($("div[data-testid='profile_card_id'] div a")),
      config.TIMEOUT.short
    );
    return await this.profileLink().click();
  }

  async goToUseCases() {
    await bd.wait(
      EC.presenceOf($("div[data-testid='use_cases_card_id'] div a")),
      config.TIMEOUT.short
    );
    return await this.useCasesLink().click();
  }
}

export default new DashboardPage();
