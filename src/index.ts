// Setup
import "dotenv/config";
import "module-alias/register";
import express, { Application, Router, json } from "express";
import { Telegraf } from "telegraf";
import { rabbitConsume } from "./functions/rabbit";
import consumer from "./functions/consumer";

// Routes
import routesMain from "./routes/main.route";

const router = Router();
const app: Application = express();

// Web status bot
export const bot = new Telegraf(process.env.TELEGRAM_BOT);

bot.start((ctx) => {
  ctx.reply("Hello " + ctx.from.first_name + "!");
});

bot.command("hello", async (ctx) => {
  console.log("🚀 ~ ctx:", ctx);
  // Explicit usage
  await ctx.reply(`good morning`);
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

app.use(json());

// API Routes
router.use(routesMain);

// Base URL
app.use("/api/telegram/v1", router);

const _date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
console.log(`[Date] ${_date}`);
console.log("[ENV]", process.env.NODE_ENV);

// HTTP Server
const PORT = process.env.PORT || 5006;
app.listen(PORT, (): void => {
  console.log(`[log] Template app listening at http://localhost:${PORT}`);
});

// RabbitMQ Queue
if (process.env.NODE_ENV === "PRODUCTION") rabbitConsume("telegram", consumer);
