import { describe, it } from "node:test";
import { expect } from "expect";
import { app as honoApp } from "./app.ts";
import { CONCHA_ASENSIO } from "./people.ts";

describe("main", () => {
  it("should fail if not all params are passed", async () => {
    const res = await honoApp.request("/api/v1/speakers/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: CONCHA_ASENSIO.id,
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
        name: CONCHA_ASENSIO.name,
        age: CONCHA_ASENSIO.age,
        language: CONCHA_ASENSIO.language,
      }),
    });
    console.log(JSON.stringify(await res.json(), null, 2));
    expect(res.status).toBe(201);
  });
});
