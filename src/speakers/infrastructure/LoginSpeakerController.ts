import { createRoute, OpenAPIHono, type RouteConfig } from "@hono/zod-openapi";
import type { interfaces } from "inversify";
import { RegisterSpeaker } from "../use-cases/RegisterSpeaker.ts";
import type { HonoController } from "../../shared/infrastructure/HonoController.ts";
import { LoginSpeakerRequestDTO } from "./dtos/LoginSpeakerRequestDTO.ts";
import { LoginSpeakerResponseDTO } from "./dtos/LoginSpeakerResponseDTO.ts";
import { CONCHA_ASENSIO } from "../../shared/infrastructure/fixtures/speakers.ts";

export class LoginSpeakerController implements HonoController {
  private static Schema = {
    method: "post",
    path: "/api/v1/speakers/login",
    request: {
      body: {
        content: {
          "application/json": {
            schema: LoginSpeakerRequestDTO,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Speaker registered",
        content: {
          "application/json": {
            schema: LoginSpeakerResponseDTO,
          },
        },
      },
    },
  } satisfies RouteConfig;

  public static create({ container }: interfaces.Context) {
    const registerSpeaker = container.get(RegisterSpeaker);
    return new LoginSpeakerController(registerSpeaker);
  }

  private readonly registerSpeaker: RegisterSpeaker;

  constructor(registerSpeaker: RegisterSpeaker) {
    this.registerSpeaker = registerSpeaker;
  }

  register(api: OpenAPIHono) {
    api.openapi(createRoute(LoginSpeakerController.Schema), async (c) => {
      const body = c.req.valid("json");
      // await this.registerSpeaker.execute();
      return c.json({ accessToken: CONCHA_ASENSIO.jwt }, 200);
    });
  }
}
