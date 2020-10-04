class CreateUseCasePage {
  constructor() {
    this.URL = "create-usecase";
    this.titleField = () => bd.findElement(By.name("title"));
    this.descriptionField = () => bd.findElement(By.name("description"));
    this.expectedResultField = () => bd.findElement(By.name("expected_result"));
    this.stepsField = (n = 0) => bd.findElement(By.name(`testStepId-${n}`));
    this.automatedSwitch = () => bd.findElement(By.name("automated-switch"));
    this.addStepBtn = () =>
      bd.findElement(By.css("button[data-testid='add_step_btn']"));
    this.deleteStepBtns = () =>
      bd.findElements(By.css("button[data-testid='delete_usecase_step_btn']"));
    this.submitBtn = () =>
      bd.findElement(By.css("button[data-testid='submit_btn']"));
    this.errorMessages = () => bd.findElements(By.css(".invalid-feedback"));
  }

  async createNewUseCase(_useCase) {
    let title = this.titleField();
    let desc = this.descriptionField();
    let er = this.expectedResultField();
    await title.clear();
    await title.sendKeys(_useCase.title);
    if (_useCase.description) {
      await desc.clear();
      await desc.sendKeys(_useCase.description);
    } else {
      await desc.clear();
    }
    await er.clear();
    await er.sendKeys(_useCase.expectedResult);
    await this.closeAllSteps();
    _useCase.steps.forEach((step, i) => {
      if (i === 0) {
        this.stepsField().clear();
        this.stepsField().sendKeys(step);
      } else {
        this.addStepBtn().click();
        this.stepsField(i).sendKeys(step);
      }
    });
    return await this.submitBtn().click();
  }

  /**
   * Checks if validation error message exists
   * @param {string} error_msg
   * @return {bool}
   */
  async errorMessageExists(_msg) {
    bd.sleep(100);
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
