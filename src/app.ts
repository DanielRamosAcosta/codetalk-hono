import { OpenAPIHono } from "@hono/zod-openapi";
import { createContainer } from "./container.ts";

export const app = createContainer().get<OpenAPIHono>("App");
