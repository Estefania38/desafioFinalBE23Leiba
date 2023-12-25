import { Router } from "express";//
import { __dirname } from "../utils.js";
import { checkAuthenticated, showLoginView, checkRole} from "../middlewares/auth.js";
import { ViewsController } from "../controllers/views.controllers.js";

 const router = Router();

         //routes de las vistas
         router.get("/", ViewsController.renderHome);
         router.get("/registro",showLoginView, ViewsController.renderSignup);
         router.get("/login", showLoginView, ViewsController.renderLogin);
         router.get("/perfil", checkAuthenticated, ViewsController.renderProfile);
         router.get("/forgot-password", ViewsController.renderForgotPassword);
         router.get("/reset-password", ViewsController.renderResetPassword);
        // corregir la vita del chat       
        router.get("/messages", checkAuthenticated, checkRole(["user", "admin"]), ViewsController.renderChat);
        router.get("/productos", checkAuthenticated, checkRole(["admin"]), ViewsController.renderProducts);
       
         //ruta a productos en tiempo real  que no estoy usando
         router.get('/realtimeproducts', ViewsController.renderRealTimeProducts);   
         router.get('/carts/:cid', ViewsController.renderCart)
         router.get('/createproduct',checkAuthenticated, checkRole(["admin"]), ViewsController.renderCreateProduct)
         router.get('/deleteproduct',checkAuthenticated, checkRole(["admin"]), ViewsController.renderDeleteProduct)

         router.get('/verify-token/:token', ViewsController.renderVerifyToken )

         
 export {router as viewsRouter};









