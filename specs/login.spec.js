import config from "../config/Configuration";
import loginPage from "../poms/LoginPage";

describe("H(a)TEC SandBox Automation", () => {
  beforeAll(async () => {
    await bd.get(`${config.BASE_URL}${loginPage.URL}`);
  });

  it("should have a title Sandbox", async () => {
    expect(await bd.getTitle()).toEqual("Sandbox");
  });
  //   console.log(protractor);
  //   console.log("yoooooo");
  it("should be able to login with correct credentials", async () => {
    loginPage.typeUsername(config.email);
    loginPage.typePassword(config.pass);
    loginPage.submitLogin();
    await bd.wait(
      protractor.ExpectedConditions.urlContains("dashboard"),
      config.TIMEOUT.short
    );
    expect(await bd.getCurrentUrl()).toEqual(`${config.BASE_URL}dashboard`);
  });
});
