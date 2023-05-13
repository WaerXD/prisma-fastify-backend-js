import { FastifyInstance, FastifyRequest } from "fastify";
import { PrismaClient, ToDo } from "@prisma/client";

const prisma = new PrismaClient();
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

interface BodyType {
  title: string;
  description: string;
  isCompleted: boolean;
}
interface ParamsType {
  id: string;
}

async function routes(fastify: FastifyInstance, options: Object) {
  //GET all
  fastify.get("/", async (_, res) => {
    try {
      const todoList: ToDo[] = await prisma.toDo.findMany({
        orderBy: [
          {
            id: "asc",
          },
        ],
      });
      res.code(200).send({ todoList });
    } catch (error: any) {
      res.code(500).send({ error: error.message });
    }
  });
  //GET id
  fastify.get(
    "/:id",
    async (req: FastifyRequest<{ Params: ParamsType }>, res) => {
      const id = parseInt(req.params.id);
      try {
        const todo = await prisma.toDo.findUnique({
          where: {
            id,
          },
        });
        if (todo === null) {
          res.code(404).send({ message: "Not found!" });
        } else {
          res.code(200).send({ todo });
        }
      } catch (error: any) {
        res.code(500).send({ erroe: error.message });
      }
    }
  );
  //POST
  fastify.post("/", async (req: FastifyRequest<{ Body: BodyType }>, res) => {
    const { title } = req.body;
    const { description } = req.body;
    const { isCompleted } = req.body;
    try {
      await prisma.toDo.create({
        data: {
          title,
          description,
          isCompleted,
        },
      });
      res.code(200).send({ message: "Todo created successfully" });
    } catch (error: any) {
      res.code(500).send({ error: error.message });
    }
  });
  //PATCH ID
  fastify.patch(
    "/:id",
    async (
      req: FastifyRequest<{ Params: ParamsType; Body: BodyType }>,
      res
    ) => {
      const id = parseInt(req.params.id);
      const { title } = req.body;
      const { description } = req.body;
      const { isCompleted } = req.body;
      try {
        const todo = await prisma.toDo.findUnique({
          where: {
            id,
          },
        });
        if (todo === null) {
          res.code(404).send({ message: "Not found!" });
        } else {
          await prisma.toDo.update({
            where: {
              id,
            },
            data: {
              title,
              description,
              isCompleted,
            },
          });
          res.code(200).send({ message: "Todo updated successfully" });
        }
      } catch (error: any) {
        res.code(500).send({ error: error.message });
      }
    }
  );
  //DELETE all
  fastify.delete("/", async (_, res) => {
    try {
      await prisma.toDo.deleteMany({
        where: {},
      });
      res.code(200).send({ message: "All Todos deleted successfully" });
    } catch (error: any) {
      res.code(500).send({ error: error.message });
    }
  });
  //DELETE id
  fastify.delete(
    "/:id",
    async (req: FastifyRequest<{ Params: ParamsType }>, res) => {
      const id = parseInt(req.params.id);
      try {
        await prisma.toDo.delete({
          where: {
            id,
          },
        });
        res.code(200).send({ message: `Todo ${id} deleted successfully` });
      } catch (error: any) {
        res.code(500).send({ error: error.message });
      }
    }
  );
}

export default routes;
