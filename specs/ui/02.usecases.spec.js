import config from "../../config/Configuration";
import loginPage from "../../poms/LoginPage";
import dashboardPage from "../../poms/DashboardPage";
import useCasesPage from "../../poms/UseCasesPage";
import useCaseCreate from "../../poms/UseCaseCreatePage";
const EC = protractor.ExpectedConditions;

let testData = {
  validUseCase: {
    title: "Valid Use Case",
    description: "Valid use case description",
    expectedResult: "Something needs to happen",
    steps: ["step1", "step2", "step3", "step4"],
    automated: true,
  },
  titleTooShort: {
    title: "XXXX",
    description: "Valid use case description",
    expectedResult: "Something needs to happen",
    steps: ["step1", "step2", "step3", "step4"],
    automated: true,
  },
  titleTooLong: {
    title: "x".repeat(256),
    description: "Valid use case description",
    expectedResult: "Something needs to happen",
    steps: ["step1", "step2", "step3", "step4"],
    automated: true,
  },
  noTitle: {
    title: "",
    description: "Valid use case description",
    expectedResult: "Something needs to happen",
    steps: ["step1", "step2", "step3", "step4"],
    automated: true,
  },
};

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

  it("shouldn't create a new use case with title out of range (5-255)", async () => {
    await useCasesPage.goToCreateUseCase();

    await useCaseCreate.createNewUseCase(testData.noTitle);
    expect(await useCaseCreate.errorMessageExists("Title is required")).toBe(
      true
    );

    await useCaseCreate.createNewUseCase(testData.titleTooShort);
    expect(
      await useCaseCreate.errorMessageExists(
        "Title needs to be between 5 and 255"
      )
    ).toBe(true);

    await useCaseCreate.createNewUseCase(testData.titleTooLong);
    expect(
      await useCaseCreate.errorMessageExists(
        "Title needs to be between 5 and 255"
      )
    ).toBe(true);
  });
});
