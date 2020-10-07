const EC = protractor.ExpectedConditions;
import config from "../config/Configuration";

class UpdateUseCasePage {
  constructor() {
    this.titleField = () => bd.findElement(By.name("title"));
    this.descriptionField = () => bd.findElement(By.name("description"));
    this.expectedResultField = () => bd.findElement(By.name("expected_result"));
    this.stepsField = (n = 0) => bd.findElement(By.name(`testStepId-${n}`));
    this.automatedSwitch = () => bd.findElement(By.css(".switchToggle label"));
    this.automatedSwitchActualInput = () => bd.findElement(By.id("switch"));
    this.addStepBtn = () => bd.findElement(By.css("button.addTestStep"));
    this.deleteStepBtns = () =>
      bd.findElements(By.css("button[data-testid='delete_usecase_step_btn']"));
    this.submitBtn = () =>
      bd.findElement(By.css("button[data-testid='submit_btn']"));
    this.errorMessages = () => bd.findElements(By.css(".invalid-feedback"));
    this.deleteUseCaseBtn = () =>
      bd.findElement(By.css("button[data-testid='remove_usecase_btn']"));
    this.deleteUseCaseConfirmBtn = () =>
      bd.findElement(By.css("div.sweet-alert button.btn-danger"));
  }

  /**
   * Updates the use case with new values
   * @param {object} _useCase
   * @return {promise}
   */
  async updateUseCase(_useCase) {
    await browser.wait(
      EC.visibilityOf(element(By.name("title"))),
      config.TIMEOUT.medium
    );

    let title = this.titleField();
    if (_useCase.title) {
      await title.clear();
      await title.sendKeys(_useCase.title);
    }
    let desc = this.descriptionField();
    if (_useCase.description) {
      await desc.clear();
      await desc.sendKeys(_useCase.description);
    }
    let er = this.expectedResultField();
    if (_useCase.expectedResult) {
      await er.clear();
      await er.sendKeys(_useCase.expectedResult);
    }

    //Check if current state of switch different
    //then what is provided in the function
    let actualSwitch = await this.automatedSwitchActualInput();
    let currentSwitchState = await actualSwitch.getAttribute("value");
    if (_useCase.automated.toString() != currentSwitchState) {
      let aswitch = this.automatedSwitch();
      await aswitch.click();
    }
    if (_useCase.steps.length) {
      await this.closeAllSteps();
      _useCase.steps.forEach((step, i) => {
        if (i === 0) {
          let step1 = this.stepsField();
          step1.clear();
          step1.sendKeys(step);
        } else {
          this.addStepBtn().click();
          this.stepsField(i).sendKeys(step);
        }
      });
    }
    //Submit the form
    return await this.submitBtn().click();
  }

  /**
   * Generates a string for new field value
   * @param {int} _length
   * @return {string} field value
   */
  generateExamFieldValue(_length) {
    return `This field previously had ${_length} characters`;
  }

  /**
   * Updates use case with all the input fields changed
   * to a string based on their current length
   * @return {promise}
   */
  async updateUseCaseWithLengthOfPreviousValue() {
    await browser.wait(
      EC.visibilityOf(element(By.name("title"))),
      config.TIMEOUT.medium
    );
    //Update text area
    let desc = this.descriptionField();
    let currentDescValue = await desc.getAttribute("value");
    await desc.clear();
    await desc.sendKeys(this.generateExamFieldValue(currentDescValue.length));
    //All other inputs
    let inputs = await bd.findElements(By.css("input[type='text']"));
    for (let input of inputs) {
      let inputValue = await input.getAttribute("value");
      await input.clear();
      await input.sendKeys(this.generateExamFieldValue(inputValue.length));
    }
    return await this.submitBtn().click();
  }

  /**
   * Closes all additional use case steps
   */
  async closeAllSteps() {
    let buttons = await this.deleteStepBtns();
    while (buttons.length) {
      await buttons[0].click();
      buttons = await this.deleteStepBtns();
    }
  }

  /**
   * Deletes the current use case
   * @return {promise}
   */
  async deleteUseCase() {
    await browser.wait(
      EC.elementToBeClickable(
        element(By.css("button[data-testid='remove_usecase_btn']")),
        config.TIMEOUT.medium
      )
    );
    let deleteBtn = this.deleteUseCaseBtn();
    await deleteBtn.click();
    await browser.wait(
      EC.elementToBeClickable(
        element(By.css("div.sweet-alert button.btn-danger")),
        config.TIMEOUT.medium
      )
    );
    let confirmBtn = this.deleteUseCaseConfirmBtn();
    return await confirmBtn.click();
  }
}

export default new UpdateUseCasePage();
