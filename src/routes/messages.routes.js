import { Router } from "express";
import { MessagesControllers } from "../controllers/messages.controller.js";
import { UserPass } from "../utils.js";

const router = Router()

router.get('/', UserPass('current'), MessagesControllers.renderMessages)

router.post('/', MessagesControllers.SendMessage )

export { router as messagesRouter };