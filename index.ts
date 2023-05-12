import fastify from "fastify";
import todosRoute from "./api/todos";
import prismaPlugin from "./plugins/prisma";
const cors = require("@fastify/cors")

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const app = fastify({
  logger: true,
});

app.register(cors, {})
app.register(todosRoute, { prefix: "/todo" });
app.register(prismaPlugin);

async function main() {
  app.listen({ port: 3100 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main();
