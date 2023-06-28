import { Router } from "express";
import MessageManagerMdb from "../src/dao/models/messages.manager.js";
import { socketServer } from "../src/app.js";


const router = Router();
const msManager = new MessageManagerMdb()


router.get("/", async (req, res) => {
    try {
        const getMessages = await msManager.getMessage()
        socketServer.emit('getMessage', getMessages());

        if(getMessages) {
            res.status(200).send(getMessages)
        }else{
            res.status(404).send("Not messages")
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

router.post("/", async (req, res) => {
    try {
        const { user, message } = req.body
        const addMessage = await msManager.addNewMessage(user, message)

        if(addMessage) {
            res.status(200).send("Message added")
        }else{
            res.status(404).send("The message could not be added")
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})
export default router;
