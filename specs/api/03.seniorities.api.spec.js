import config from "../../config/Configuration";
import API from "../../api/ApiUtils";
let jwt = "";
let testData = {
  seniorityName: "SuperDooper Senior",
  seniorityId: "",
  tooShortSeniorityName: "x", //1
  tooLongSeniorityName: "123456789012345678901234567890X", //31
};

describe("[API] Playground/Seniorities", () => {
  beforeAll(async () => {
    let response = await API.login(config.email, config.pass);
    jwt = response.data.token;
  });

  it("shouldn't show seniorities to unauthorized users", async () => {
    let response = await API.getSeniorities("InvalidToken");
    expect(response.status).toBe(401);
    expect(response.data).toBe("Unauthorized");
  });

  it("should show all existing seniorities", async () => {
    let response = await API.getSeniorities(jwt);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
  });

  it("shouldn't allow seniority creation to unauthorized user", async () => {
    let response = await API.createNewSeniority(
      "InvalidToken",
      "WillNotBeAdded"
    );
    expect(response.status).toBe(401);
    expect(response.data).toBe("Unauthorized");
  });

  it("should create a new seniority", async () => {
    let response = await API.createNewSeniority(jwt, testData.seniorityName);
    expect(response.status).toBe(200);
    expect(response.data.seniority_title).toBe(testData.seniorityName);
    expect(response.data.seniority_id).toBeDefined();
    testData.seniorityId = response.data.seniority_id;
  });

  it("shouldn't create a seniority with already existing name", async () => {
    let response = await API.createNewSeniority(jwt, testData.seniorityName);
    expect(response.status).toBe(400);
    expect(response.data.seniority_title).toBe(
      "Seniority title already exists"
    );
  });

  it("shouldn't create a seniority with title out of range (2-30)", async () => {
    let responses = [];

    responses.push(
      await API.createNewSeniority(jwt, testData.tooShortSeniorityName),
      await API.createNewSeniority(jwt, testData.tooLongSeniorityName)
    );

    responses.forEach((response) => {
      expect(response.status).toBe(400);
      expect(response.data.seniority_title).toBe(
        "Title needs to be between 2 and 30"
      );
    });
  });

  it("shouldn't edit a seniority without authorization", async () => {
    let response = await API.editExistingSeniority(
      "InvalidToken",
      testData.seniorityId,
      "SuperDooper Senior Edit"
    );
    expect(response.status).toBe(401);
    expect(response.data).toBe("Unauthorized");
  });

  it("shouldn't edit a seniority with title out of range (2-30)", async () => {
    let responses = [];
    responses.push(
      await API.editExistingSeniority(
        jwt,
        testData.seniorityId,
        testData.tooLongSeniorityName
      ),
      await API.editExistingSeniority(
        jwt,
        testData.seniorityId,
        testData.tooShortSeniorityName
      )
    );

    responses.forEach((response) => {
      expect(response.status).toBe(400);
      expect(response.data.seniority_title).toBe(
        "Title needs to be between 2 and 30"
      );
    });
  });

  it("should edit a seniority", async () => {
    let response = await API.editExistingSeniority(
      jwt,
      testData.seniorityId,
      "SooperDooper Edit"
    );
    expect(response.status).toBe(200);
    expect(response.data.seniority_title).toBe("SooperDooper Edit");
  });

  it("shouldn't delete a seniority without authorization", async () => {
    let response = await API.deleteExistingSeniority(
      "InvalidToken!",
      testData.seniorityId
    );
    expect(response.status).toBe(401);
    expect(response.data).toBe("Unauthorized");
  });

  it("should be able to delete a seniority", async () => {
    let response = await API.deleteExistingSeniority(jwt, testData.seniorityId);
    expect(response.status).toBe(200);
    expect(response.data.Success).toBe("Entry removed successfully");
  });
});
