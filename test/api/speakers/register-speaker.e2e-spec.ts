import { describe, it } from "node:test";
import { expect } from "expect";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { OpenAPIHono } from "@hono/zod-openapi";
import { container } from "../../../src/container.ts";
import type { Container } from "inversify";
import type { Clock } from "../../../src/shared/domain/services/Clock.ts";
import { CONCHA_ASENSIO } from "../../../src/shared/infrastructure/fixtures/speakers.ts";

class TestClient {
  private readonly container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  get app() {
    return this.container.get<OpenAPIHono>("App");
  }

  getClock() {
    return this.container.get<Clock>("Clock");
  }

  async registerSpeaker() {
    const res = await this.app.request("/api/v1/speakers/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: CONCHA_ASENSIO.id,
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      }),
    });
    expect(res.status).toBe(201);
    return {
      status: res.status,
      res,
    };
  }

  async loginSpeaker() {
    const res = await this.app.request("/api/v1/speakers/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      }),
    });
    expect(res.status).toBe(200);
    return {
      status: res.status,
      body: await res.json(),
      res,
    };
  }
}

async function createClient() {
  return new TestClient(container);
}

describe("register speaker", () => {
  it("registers the user and then can login", async () => {
    const client = await createClient();

    await client.registerSpeaker();

    const { status } = await client.loginSpeaker();
    expect(status).toBe(200);
  });

  it("login returns a refresh token", async () => {
    const client = await createClient();
    const clock = client.getClock();
    const now = clock.now();
    const expectedIat = now.toSeconds();
    const expectedExp = now.addDays(1).toSeconds();
    await client.registerSpeaker();

    const { body } = await client.loginSpeaker();

    const content = jwt.decode(body.accessToken) as JwtPayload;
    expect(content.sub).toEqual(CONCHA_ASENSIO.id);
    expect(content.iat).toEqual(expectedIat);
    expect(content.exp).toEqual(expectedExp);
  });
});
