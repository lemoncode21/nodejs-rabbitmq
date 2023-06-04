import express from "express";
import bodyParser from "body-parser";
import constrollers from "./controller.js";
import RabbitMQConfig from "./config.js";


const app = express();
const jsonParser = bodyParser.json();

app.post("/api/send", jsonParser, constrollers.sendMessageToRedis);

//  consume from channel redis "my-channel"
const queue = 'my-queue';
const rabbitMQConfig = new RabbitMQConfig()
await rabbitMQConfig.connect();
await rabbitMQConfig.subscribeToQueue(queue, (message) => {
     console.log("Received message:", message);
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
