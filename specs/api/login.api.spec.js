import config from "../../config/Configuration";
import API from "../../api/ApiUtils";

describe("HTEC QA SandBox Login Module - API", () => {
  it("shouldn't be able to login with invalid password", async () => {
    let response = await API.login(config.email, "ThisPassIsNoGood!");
    await expect(response.status).toBe(400);
    await expect(response.statusText).toBe("Bad Request");
    await expect(response.data.password).toBe("Password incorrect");
  });

  it("should be able to login with valid credentials", async () => {
    let response = await API.login(config.email, config.pass);
    await expect(response.status).toBe(200);
    await expect(response.statusText).toBe("OK");
  });
});
