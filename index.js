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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const todos_1 = __importDefault(require("./api/todos"));
const prisma_1 = __importDefault(require("./plugins/prisma"));
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const app = (0, fastify_1.default)({
    logger: true,
});
app.register(todos_1.default, { prefix: "/todo" });
app.register(prisma_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen({ port: 3100 }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server listening at ${address}`);
        });
    });
}
main();
