import RabbitMQConfig from "./config.js";


const sendMessageToRedis = async (req, res) => {
     try {
       const { message } = req.body;

       const queue = 'my-queue';
       const rabbitMQConfig = new RabbitMQConfig();
       // Open connection
       await rabbitMQConfig.connect();

       // send message to publish
       await rabbitMQConfig.createQueue(queue)
       await rabbitMQConfig.publishToQueue(queue, message);

       // Close connection
       await rabbitMQConfig.close();

       res.status(200).json({
         status: "Ok!",
         message: "Message successfully send!",
       
       });
     } catch (error) {
       console.log(error);
     }
   };
   
   const constrollers = { sendMessageToRedis };
   
   export default constrollers;