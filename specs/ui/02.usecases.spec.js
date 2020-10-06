import config from "../../config/Configuration";
import loginPage from "../../poms/LoginPage";
import dashboardPage from "../../poms/DashboardPage";
import useCasesPage from "../../poms/UseCasesPage";
import useCaseCreate from "../../poms/UseCaseCreatePage";
import useCaseUpdatePage from "../../poms/UseCaseUpdatePage";
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

  afterAll(async () => {
    await dashboardPage.logout();
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

  it("shouldn't create a use case with invalid use case step", async () => {
    await useCaseCreate.createNewUseCase(testData.noUseCaseSteps);
    expect(
      await useCaseCreate.errorMessageExists(
        "There must be at least one test step"
      )
    );

    await useCaseCreate.createNewUseCase(testData.tooLongUseCaseStep);
    expect(
      await useCaseCreate.errorMessageExists(
        "Test step needs to be between 0 and 255"
      )
    );
  });

  it("should create a valid use case", async () => {
    await useCaseCreate.createNewUseCase(testData.validUseCase);
    expect(
      await bd.wait(
        EC.urlIs(`${config.BASE_URL}${useCasesPage.URL}`),
        config.TIMEOUT.short
      )
    ).toBe(true);
  });

  it("should navigate to specific use case page", async () => {
    await useCasesPage.goToUseCase(testData.validUseCase.title);
    expect(
      await bd.wait(
        EC.visibilityOf($("button[data-testid='remove_usecase_btn']")),
        config.TIMEOUT.long
      )
    ).toBe(true);
  });

  it("should update existing use case", async () => {
    await useCaseUpdatePage.updateUseCase(testData.validUseCaseUpdate);
    expect(
      await bd.wait(
        EC.urlIs(`${config.BASE_URL}${useCasesPage.URL}`),
        config.TIMEOUT.short
      )
    ).toBe(true);
  });

  it("should delete existing use case", async () => {
    await useCasesPage.goToUseCase(testData.validUseCaseUpdate.title);
    expect(
      await bd.wait(
        EC.visibilityOf($("button[data-testid='remove_usecase_btn']")),
        config.TIMEOUT.long
      )
    ).toBe(true);
    await useCaseUpdatePage.deleteUseCase();
    expect(
      await bd.wait(
        EC.urlIs(`${config.BASE_URL}${useCasesPage.URL}`),
        config.TIMEOUT.short
      )
    ).toBe(true);
  });

  it("should create 4 different use cases", async () => {
    testData.exam.forEach(async (useCase) => {
      await useCasesPage.goToCreateUseCase();
      expect(
        await bd.wait(EC.urlContains(useCaseCreate.URL), config.TIMEOUT.short)
      ).toBe(true);
      await useCaseCreate.createNewUseCase(useCase);
      expect(
        await bd.wait(
          EC.urlIs(`${config.BASE_URL}${useCasesPage.URL}`),
          config.TIMEOUT.short
        )
      ).toBe(true);
    });
  });

  it("should update use case base on the previous values length", async () => {
    // testData.exam.forEach(async (useCase) => {
    //   await useCasesPage.goToUseCase(useCase.title);
    //   expect(
    //     await bd.wait(
    //       EC.visibilityOf($("button[data-testid='remove_usecase_btn']")),
    //       config.TIMEOUT.long
    //     )
    //   ).toBe(true);
    //   await useCaseUpdatePage.updateUseCaseWithLengthOfPreviousValue();
    // });
    await useCasesPage.goToUseCase(testData.exam[0].title);
    bd.sleep(2000);
    await useCaseUpdatePage.updateUseCaseWithLengthOfPreviousValue();
  });
});
