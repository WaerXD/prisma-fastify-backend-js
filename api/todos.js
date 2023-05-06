"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        //GET all
        fastify.get("/", (_, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todoList = yield prisma.toDo.findMany();
                res.code(200).send({ todoList });
            }
            catch (error) {
                res.code(500).send({ error: error.message });
            }
        }));
        //GET id
        fastify.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const todo = yield prisma.toDo.findUnique({
                    where: {
                        id,
                    },
                });
                if (todo === null) {
                    res.code(404).send({ message: "Not found!" });
                }
                else {
                    res.code(200).send({ todo });
                }
            }
            catch (error) {
                res.code(500).send({ erroe: error.message });
            }
        }));
        //POST
        fastify.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const { description } = req.body;
            const { isCompleted } = req.body;
            try {
                yield prisma.toDo.create({
                    data: {
                        title,
                        description,
                        isCompleted,
                    },
                });
                res.code(200).send({ message: "Todo created successfully" });
            }
            catch (error) {
                res.code(500).send({ error: error.message });
            }
        }));
        //PATCH ID
        fastify.patch("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const { title } = req.body;
            const { description } = req.body;
            const { isCompleted } = req.body;
            try {
                const todo = yield prisma.toDo.findUnique({
                    where: {
                        id,
                    },
                });
                if (todo === null) {
                    res.code(404).send({ message: "Not found!" });
                }
                else {
                    yield prisma.toDo.update({
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
            }
            catch (error) {
                res.code(500).send({ error: error.message });
            }
        }));
        //DELETE all
        fastify.delete("/", (_, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.toDo.deleteMany({
                    where: {},
                });
                res.code(200).send({ message: "All Todos deleted successfully" });
            }
            catch (error) {
                res.code(500).send({ error: error.message });
            }
        }));
        //DELETE id
        fastify.delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                yield prisma.toDo.delete({
                    where: {
                        id,
                    },
                });
                res.code(200).send({ message: `Todo ${id} deleted successfully` });
            }
            catch (error) {
                res.code(500).send({ error: error.message });
            }
        }));
    });
}
exports.default = routes;
