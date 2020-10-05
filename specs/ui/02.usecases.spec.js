import config from "../../config/Configuration";
import loginPage from "../../poms/LoginPage";
import dashboardPage from "../../poms/DashboardPage";
import useCasesPage from "../../poms/UseCasesPage";
import useCaseCreate from "../../poms/UseCaseCreatePage";
import testData from "./testdata/usecases";
const EC = protractor.ExpectedConditions;

describe("Use Cases Detailed UI Test", () => {
  beforeAll(async () => {
    await bd.get(`${config.BASE_URL}${loginPage.URL}`);
    await loginPage.logTheUserIn(config.email, config.pass);
    await bd.wait(EC.urlContains(dashboardPage.URL), config.TIMEOUT.short);
    await dashboardPage.goToUseCases();
    await bd.wait(EC.urlContains(useCasesPage.URL), config.TIMEOUT.short);
  });

  it("should open use case creation page", async () => {
    await useCasesPage.goToCreateUseCase();
    expect(
      await bd.wait(EC.urlContains(useCaseCreate.URL), config.TIMEOUT.short)
    ).toBe(true);
  });

  it("shouldn't create a new use case with title out of range (5-255)", async () => {
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
    await useCaseCreate.createNewUseCase(testData.noTitle);
    expect(await useCaseCreate.errorMessageExists("Title is required")).toBe(
      true
    );
  });

  it("shouldn't create a new use case with invalid expected results", async () => {
    await useCaseCreate.createNewUseCase(testData.noExpectedResults);
    expect(
      await useCaseCreate.errorMessageExists("Expected result is required")
    ).toBe(true);
    await useCaseCreate.createNewUseCase(testData.expectedResultsTooLong);
    expect(
      await useCaseCreate.errorMessageExists(
        "Expected results needs to be between 5 and 255"
      )
    ).toBe(true);
    await useCaseCreate.createNewUseCase(testData.expectedResultsTooShort);
    expect(
      await useCaseCreate.errorMessageExists(
        "Expected results needs to be between 5 and 255"
      )
    ).toBe(true);
  });
});
