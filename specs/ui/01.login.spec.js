import config from "../../config/Configuration";
import loginPage from "../../poms/LoginPage";
import dashboardPage from "../../poms/DashboardPage";
const EC = protractor.ExpectedConditions;

describe("[UI] HTEC QA SandBox - Login", () => {
  beforeAll(async () => {
    await bd.get(`${config.BASE_URL}${loginPage.URL}`);
  });

  it("should have a title Sandbox", async () => {
    expect(await bd.getTitle()).toEqual("Sandbox");
  });

  it("should be able to login with correct credentials", async () => {
    loginPage.logTheUserIn(config.email, config.pass);
    await bd.wait(EC.urlContains(dashboardPage.URL), config.TIMEOUT.short);
    expect(await bd.getCurrentUrl()).toEqual(
      `${config.BASE_URL}${dashboardPage.URL}`
    );
  });

  it("should be able to logout", async () => {
    dashboardPage.logout();
    await bd.wait(
      EC.not(EC.urlContains(dashboardPage.URL)),
      config.TIMEOUT.short
    );
    expect(await bd.getCurrentUrl()).toEqual(config.BASE_URL);
  });
});
