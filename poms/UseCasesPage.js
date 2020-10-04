class UseCases {
  constructor() {
    this.URL = "use-cases";
    this.createUseCaseBtn = () =>
      bd.findElement(By.css("a[data-testid='create_use_case_btn']"));
  }

  async goToCreateUseCase() {
    return await this.createUseCaseBtn().click();
  }
}

export default new UseCases();
