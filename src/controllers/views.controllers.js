import { productDao } from "../dao/factory.js";
import { CartsService } from "../services/carts.service.js";
import { userPasswordService } from "../services/userPassword.service.js";;
import {UsersService} from "../services/users.service.js";


export class ViewsController {
    static renderHome = (req, res) => {
        res.render("home");
    };
    static renderSignup = (req, res) => {
        res.render("signup");
    };
    static renderLogin = (req, res) => {
        res.render("login");
    };
    // static renderCart = (req, res) => {
    //     res.render("cart");
    // };
    // CONTROLLER (GET) PARA RENDERIZAR UN CARRITO Y SUS PRODUCTOS
    static renderCart = async (req,res)=>{ 
        //---------------LOGICA----------------------
            let cid =req.params.cid
            let cart = await CartsService.getCart({_id:cid})
            if(cart == null){
                
                return res.status(404).send({
                    status: 'error',
                    message: 'carrito no existente'
                })
            }
            
            let products = cart[0].products
            

        //---------------RESPUESTA-------------------
            return res.render('cart',{products:products,cid:cid})
        
    }
    static renderDeleteProduct= (req, res) => {
        res.render("deleteProduct");
    };
    static renderCreateProduct= (req, res) => {
        res.render("createProduct");
    };
    
    //chequear ruta de perfil
    static renderProfile = (req, res) => {
        console.log(req.user);
        res.render("profile", { user: JSON.parse(JSON.stringify(req.user)) });
    }
    static renderForgotPassword = (req, res) => {
        res.render("forgotPassword");
    }
    static renderResetPassword = (req, res) => {
        const token = req.query.token;
        res.render("resetPassword", {token});
    }
    static renderChat = (req, res) => {
        res.render("messages")
    }
    static renderProducts = async (req, res) => {
        try {
            const { limit = 10, page = 1, stock, sort = "asc" } = req.query;
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            if (!["asc", "desc"].includes(sort)) {
                return res.render("products", { error: "Orden no válido" })
            };
            const sortValue = sort === "asc" ? 1 : -1;
            let query = {};
            if (stockValue) {
                query = { category: "categoria", stock: { $gte: stockValue } }
            }
            const result = await productDao.getWithPaginate(query, {
                page,
                limit,
                sort: { price: sortValue },
                lean: true
            });
            // asi capturo la ruta de mi servidor capturo el protocolo"http" y el host: "localhost"
            const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
            const resultProductsView = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                page: result.page,
                prevPage: result.prevPage,
                hasPrevPage: result.hasPrevPage,
                prevLink: result.hasPrevPage ? baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`) : null,
                nextPage: result.nextPage,
                hasNextPage: result.hasNextPage,
                nextLink: result.hasNextPage ? baseUrl.includes("page") ? baseUrl.replace(`page=${result.page}`,
                    `page=${result.nextPage}`) : baseUrl.includes("?") ? baseUrl.concat(`&page=${result.nextPage}`) :
                    baseUrl.concat(`?page=${result.nextPage}`) : null
            }
            res.render("products", resultProductsView);
        } catch (error) {
            res.render("products", { error: "No es posible visualizar los productos" });
        }
    }
    // este no lo estoy usando actualmente
    static renderRealTimeProducts = async (req, res) => {
        try {
            const listaproductos = await productDao.getProducts({})
            res.render("realTimeProducts", { listaproductos: listaproductos });
        } catch (error) {
            console.error("Error en la ruta /realTimeProducts:", error);
            res.status(500).send("Error interno del servidor");
        }
    }

    // agregados para prueba
    // CONTROLLER (GET) PARA RENDERIZAR VERIFICAR TOKEN
    static renderVerifyToken = async (req,res)=>{

        const userPassword = await userPasswordService.getUserPassword({token:req.params.token})

        if(userPassword == ''){
            return res.status(404).json({status:'error', message:'Token no valido / el token a expirado'})
        }

        const user = userPassword[0].email
        return res.render(`sessions/reset-password`,{user})

}

// CONTROLLER (GET) PARA RENDERIZAR TODOS LOS PRODUCTOS EN TIEMPO REAL CON SOCKET
static renderUsers = async (req,res)=>{

    //---------------LOGICA----------------------
        const users = await UsersService.getUsers()

    //---------------RESPUESTA-------------------
        return res.render('users',{users:users})

}
}