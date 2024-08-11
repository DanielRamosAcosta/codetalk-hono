import { z, createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { CONCHA_ASENSIO } from "./people.ts";

const RegisterSpeakerRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: CONCHA_ASENSIO.id }),
    email: z.string().email().openapi({ example: CONCHA_ASENSIO.email }),
    password: z.string().openapi({ example: CONCHA_ASENSIO.password }),
  })
  .openapi("RegisterSpeakerRequestDTO");

const api = new OpenAPIHono();

api.openapi(
  createRoute({
    method: "post",
    path: "/api/v1/speakers/registration",
    request: {
      body: {
        content: {
          "application/json": {
            schema: RegisterSpeakerRequestDTO,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Speaker registered",
      },
    },
  }),
  (c) => {
    const body = c.req.valid("json");
    console.log("data", body);
    return c.body(null, 201);
  }
);

api.doc("/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

api.get("/ui", swaggerUI({ url: "/docs" }));

export const app = api;
