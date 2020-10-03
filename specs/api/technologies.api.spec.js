import config from "../../config/Configuration";
import API from "../../api/ApiUtils";
let jwt = "";
let testData = {
  technologyName: "JavaScript <3",
  technologyId: "",
  tooShortTechnologyName: "x", //1
  tooLongTechnologyName: "123456789012345678901234567890X", //31
};

describe("[API] Playground/Technologies", () => {
  beforeAll(async () => {
    let response = await API.login(config.email, config.pass);
    jwt = response.data.token;
  });

  it("shouldn't show technologies to unauthorized users", async () => {
    let response = await API.getTechnologies("InvalidToken");
    expect(response.status).toBe(401);
    expect(response.data).toBe("Unauthorized");
  });

  it("should show all existing technologies", async () => {
    let response = await API.getTechnologies(jwt);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
  });

  it("shouldn't allow technology creation to unauthorized user", async () => {
    let response = await API.createNewTechnology(
      "InvalidToken",
      "WillNotBeAdded"
    );
    expect(response.status).toBe(401);
    expect(response.data).toBe("Unauthorized");
  });

  it("should create a new technology", async () => {
    let response = await API.createNewTechnology(jwt, testData.technologyName);
    expect(response.status).toBe(200);
    expect(response.data.technology_title).toBe(testData.technologyName);
    expect(response.data.technology_id).toBeDefined();
    testData.technologyId = response.data.technology_id;
  });

  it("shouldn't create a technology with already existing name", async () => {
    let response = await API.createNewTechnology(jwt, testData.technologyName);
    expect(response.status).toBe(400);
    expect(response.data.technology_title).toBe(
      "Technology title already exists"
    );
  });

  it("shouldn't create a technology with title out of range (2-30)", async () => {
    let responses = [];

    responses.push(
      await API.createNewTechnology(jwt, testData.tooShortTechnologyName),
      await API.createNewTechnology(jwt, testData.tooLongTechnologyName)
    );

    responses.forEach((response) => {
      expect(response.status).toBe(400);
      expect(response.data.technology_title).toBe(
        "Title needs to be between 2 and 30"
      );
    });
  });

  it("shouldn't edit a technology without authorization", async () => {
    let response = await API.editExistingTechnology(
      "InvalidToken",
      testData.technologyId,
      "JavaScript Edited"
    );
    expect(response.status).toBe(401);
    expect(response.data).toBe("Unauthorized");
  });

  it("shouldn't edit a technology with title out of range (2-30)", async () => {
    let responses = [];
    responses.push(
      await API.editExistingTechnology(
        jwt,
        testData.technologyId,
        testData.tooShortTechnologyName
      ),
      await API.editExistingTechnology(
        jwt,
        testData.technologyId,
        testData.tooLongTechnologyName
      )
    );

    responses.forEach((response) => {
      expect(response.status).toBe(400);
      expect(response.data.technology_title).toBe(
        "Title needs to be between 2 and 30"
      );
    });
  });

  it("should edit a technology", async () => {
    let response = await API.editExistingTechnology(
      jwt,
      testData.technologyId,
      "JavaScript Edited <3"
    );
    expect(response.status).toBe(200);
    expect(response.data.technology_title).toBe("JavaScript Edited <3");
  });

  it("shouldn't delete a tehnology without authorization", async () => {
    let response = await API.deleteExistingTechnology(
      "InvalidToken!",
      testData.technologyId
    );
    expect(response.status).toBe(401);
    expect(response.data).toBe("Unauthorized");
  });

  it("should be able to delete a technology", async () => {
    let response = await API.deleteExistingTechnology(
      jwt,
      testData.technologyId
    );
    expect(response.status).toBe(200);
    expect(response.data.Success).toBe("Entry removed successfully");
  });
});
