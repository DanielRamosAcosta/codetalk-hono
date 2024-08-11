import { Hono } from "hono";
import { validator } from "hono/validator";
import { zValidator } from "@hono/zod-validator";
import { swaggerUI } from "@hono/swagger-ui";
import { CONCHA_ASENSIO } from "./people.ts";
import { CreateSpeakerRequestDTO } from "./schema.ts";

export const app = new Hono();

app.post(
  "/api/v1/speakers/registration",
  zValidator("json", CreateSpeakerRequestDTO),
  async (c) => {
    const validated = c.req.valid("json");
    console.log(validated);

    return c.json({ status: "ok" });
  }
);

// api.get("/ui", swaggerUI({ url: "/docs" }));
