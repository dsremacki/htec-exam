class CreateUseCasePage {
  constructor() {
    this.URL = "create-usecase";
    this.titleField = () => bd.findElement(By.name("title"));
    this.descriptionField = () => bd.findElement(By.name("description"));
    this.expectedResultField = () => bd.findElement(By.name("expected_result"));
    this.stepsField = (n = 0) => bd.findElement(By.name(`testStepId-${n}`));
    this.automatedSwitch = () => bd.findElement(By.css(".switchToggle label"));
    this.addStepBtn = () =>
      bd.findElement(By.css("button[data-testid='add_step_btn']"));
    this.deleteStepBtns = () =>
      bd.findElements(By.css("button[data-testid='delete_usecase_step_btn']"));
    this.submitBtn = () =>
      bd.findElement(By.css("button[data-testid='submit_btn']"));
    this.errorMessages = () => bd.findElements(By.css(".invalid-feedback"));
  }

  async clearFormFields() {
    await this.titleField().clear();
    await this.descriptionField().clear();
    await this.expectedResultField().clear();
    await this.closeAllSteps();
    await this.stepsField().clear();
  }

  async createNewUseCase(_useCase) {
    await bd.navigate().refresh();
    let title = this.titleField();
    if (_useCase.title) await title.sendKeys(_useCase.title);
    let desc = this.descriptionField();
    if (_useCase.description) await desc.sendKeys(_useCase.description);
    let er = this.expectedResultField();
    if (_useCase.expectedResult) await er.sendKeys(_useCase.expectedResult);
    if (_useCase.automated) {
      let aswitch = this.automatedSwitch();
      await aswitch.click();
    }
    if (_useCase.steps.length) {
      _useCase.steps.forEach((step, i) => {
        if (i === 0) {
          this.stepsField().sendKeys(step);
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
   * Checks if validation error message exists
   * @param {string} error_msg
   * @return {bool}
   */
  async errorMessageExists(_msg) {
    bd.sleep(200);
    let errorElements = await this.errorMessages();
    let result = false;
    for (let errorElement of errorElements) {
      if ((await errorElement.getText()) === _msg) result = true;
    }
    return result;
  }

  async closeAllSteps() {
    let buttons = await this.deleteStepBtns();
    while (buttons.length) {
      await buttons[0].click();
      buttons = await this.deleteStepBtns();
    }
  }
}

export default new CreateUseCasePage();
