import config from "../../config/Configuration";
import loginPage from "../../poms/LoginPage";
import dashboardPage from "../../poms/DashboardPage";
import useCasesPage from "../../poms/UseCasesPage";
const EC = protractor.ExpectedConditions;

describe("Use Cases Detailed UI Test", () => {
  beforeAll(async () => {
    await bd.get(`${config.BASE_URL}${loginPage.URL}`);
    loginPage.typeUsername(config.email);
    loginPage.typePassword(config.pass);
    loginPage.submitLogin();
    await bd.wait(EC.urlContains(dashboardPage.URL), config.TIMEOUT.short);
    await dashboardPage.goToUseCases();
    await bd.wait(EC.urlContains(useCasesPage.URL), config.TIMEOUT.short);
  });

  it("should have a title Sandbox", async () => {
    expect(await bd.getTitle()).toEqual("Sandbox");
  });

  it("should create a new use case", async () => {
    await useCasesPage.goToCreateUseCase();
    bd.sleep(5000);
  });
});
