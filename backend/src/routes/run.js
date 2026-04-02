import { executePHP } from "../services/executor.js";

export default async function (app) {
  app.post("/api/run", async (req, reply) => {
    const { code } = req.body;

    if (!code) {
      return reply.code(400).send({
        error: "Missing code"
      });
    }

    const result = await executePHP(code);

    return result;
  });
}
