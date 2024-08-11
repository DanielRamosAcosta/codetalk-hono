import { describe, it } from "node:test";
import { expect } from "expect";
import { app as honoApp } from "./app.ts";
import { CONCHA_ASENSIO } from "./people.ts";

describe("main", () => {
  it("should fail if not all params are passed", async () => {
    const res = await honoApp.request("/api/v1/speakers/registration", {
      method: "POST",
      body: JSON.stringify({
        id: CONCHA_ASENSIO.id,
        // email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      }),
    });
    expect(res.status).toBe(400);
  });
});
