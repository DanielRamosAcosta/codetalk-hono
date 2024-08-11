import { OpenAPIHono } from "@hono/zod-openapi";
import { container } from "./container.ts";

export const app = container.get<OpenAPIHono>("App");
