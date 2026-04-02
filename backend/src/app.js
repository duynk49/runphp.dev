import Fastify from "fastify";
import cors from "@fastify/cors";
import runRoute from "./routes/run.js";

const app = Fastify({
  logger: true
});

app.register(cors, {
  origin: "*"
});

app.register(runRoute);

app.get("/", async () => {
  return { status: "ok" };
});

app.listen({ port: 3000, host: "0.0.0.0" });
