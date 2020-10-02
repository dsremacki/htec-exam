import config from "../../config/Configuration";
import API from "../../api/ApiUtils";

describe("HTEC QA SandBox Login Module - API", () => {
  it("shouldn't be able to login with non registered email", async () => {
    let response = await API.login("zzz@yyy.xxx", "Whatevah");
    expect(response.status).toBe(404);
    expect(response.statusText).toBe("Not Found");
    expect(response.data.email).toBe("User not found");
  });

  it("shouldn't be able to login with invalid password", async () => {
    let response = await API.login(config.email, "ThisPassIsNoGood!");
    expect(response.status).toBe(400);
    expect(response.statusText).toBe("Bad Request");
    expect(response.data.password).toBe("Password incorrect");
  });

  it("should be able to login with valid credentials", async () => {
    let response = await API.login(config.email, config.pass);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.token).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();
  });
});
