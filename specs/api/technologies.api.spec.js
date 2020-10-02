import config from "../../config/Configuration";
import API from "../../api/ApiUtils";
let jwt = "";
let testData = {
  technologyName: "JavaScript <3",
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
  });

  it("shouldn't create a technology with existing name", async () => {
    let response = await API.createNewTechnology(jwt, testData.technologyName);
    expect(response.status).toBe(400);
    expect(response.data.technology_title).toBe(
      "Technology title already exists"
    );
  });
});
