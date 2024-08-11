import { describe, it } from "node:test";
import { expect } from "expect";
import { app as honoApp } from "./app.ts";
import { CONCHA_ASENSIO } from "./people.ts";

class TestClient {
  app: typeof honoApp;

  constructor(app: typeof honoApp) {
    this.app = app;
  }

  async registerSpeaker({ id = CONCHA_ASENSIO.id, expectedStatus = 201 } = {}) {
    const res = await this.app.request("/api/v1/speakers/registration", {
      method: "POST",
      body: JSON.stringify({
        id,
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      }),
    });
    expect(res.status).toBe(expectedStatus);
    return res;
  }

  async loginSpeaker({ expectedStatus = 200 } = {}) {
    const res = await this.app.request("/api/v1/speakers/login", {
      method: "POST",
      body: JSON.stringify({
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      }),
    });
    expect(res.status).toBe(expectedStatus);
    return res;
  }
}

describe("main", () => {
  it("should work", async () => {
    const testClient = new TestClient(honoApp);

    await testClient.registerSpeaker();
    // const res = await testClient.loginSpeaker();
    // const body = await res.json();

    // expect(body.accessToken).toBe(CONCHA_ASENSIO.jwt);
  });
});
