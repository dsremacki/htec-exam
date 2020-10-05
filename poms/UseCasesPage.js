class UseCases {
  constructor() {
    this.URL = "use-cases";
    this.createUseCaseBtn = () =>
      bd.findElement(By.css("a[data-testid='create_use_case_btn']"));
  }

  /**
   * Navigates to use case creation page
   * @returns {promise}
   */
  async goToCreateUseCase() {
    return await this.createUseCaseBtn().click();
  }

  /**
   * Finds the use case by title and proceeds to its edit page
   * @param {string} _title
   * @returns {promise}
   */
  async goToUseCase(_title) {
    bd.sleep(100);
    let useCase = await bd.findElement(By.xpath(`//a[text()='${_title}']`));

    return await useCase.click();
  }
}

export default new UseCases();
