
// import { io } from "socket.io-client";
import { messagesService } from "../services/messages.service.js"


export class MessagesControllers {
// CONTROLLER (GET) PARA RENDERIZAR TODOS LOS MENSAJES
    static renderMessages = async (req,res)=>{ 
        //---------------LOGICA----------------------
            const historial= await messagesService.getHistorial()
        //---------------RESPUESTA-------------------
            return res.render('messages',{historial}) 
    
    }

// CONTROLLER (POST) PARA CREAR UN NUEVO MENSAJE
    static SendMessage = async (req,res)=>{ 
        //---------------LOGICA----------------------
            const socket= io('http://localhost:8080')
            const message =req.body
            await messagesService.newMessage(message)
            socket.emit('send' , await messagesService.getHistorial())
        //---------------RESPUESTA-------------------
            return res.redirect("/messages")
    
    }
}