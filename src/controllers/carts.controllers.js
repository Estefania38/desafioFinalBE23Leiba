import { TicketsService } from "../services/tickets.service.js";
import {CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";


// CONTROLLER (POST) PARA CREAR UN NUEVO CARRITO
    export const createCart= async (req,res) => {
        //---------------LOGICA----------------------
        CartsService.createCart()

        //---------------RESPUESTA-------------------
            return res.status(201).send({
                status: 'success',
                message: 'nuevo carrito creado con exito'
            })
        
    }

// CONTROLLER (GET) PARA TRAER EL CARRITO POR SU ID
    export const getCartByID = async (req,res)=> {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            const carrito = await CartsService.GetCart({_id:cid})

        //---------------RESPUESTA-------------------
            if(carrito==false){
                return res.status(404).send({
                    status: 'error',
                    message: `Carrito ${cid} no existe`
                })
            }

            return res.status(200).send({
                status:'success',
                payload: carrito
            })
    }

// CONTROLLER (POST) PARA AGREGAR UN PRODUCTO AL CARRITO
    export const addToCartByID = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            const pid = req.params.pid
            let producto = await ProductsService.getProducts({_id:pid})

            if(producto[0].owner==req.user.user.email){
                return res.status(400).send({
                    status: 'error',
                    message: `no puedes agregar un producto propio al carrito`
                })
            }

            let action = await CartsService.AddToCart(cid,pid)
        
        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: `carrito ${cid} o producto ${pid} no existe`
                })
            }

            return res.redirect(`http://localhost:8080/api/carts/${cid}`)
    }

// CONTROLLER (DELETE) PARA ELIMINAR UN PRODUCTO EN EL CARRITO
    export const deleteProductInCart = async (req,res) => {

        //---------------LOGICA----------------------
            const pid = req.params.pid
            const cid = req.params.cid
            
            const action = await CartsService.DeleteProduct(cid,pid)

        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: 'producto o carrito no existe'
                })
            }

            return res.status(200).send({
                status: 'success',
                message: 'producto eliminado con exito'
            })
    }

// CONTROLLER (DELETE) PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
    export const deleteAllProducts = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            
            const action = await CartsService.DeleteAllProducts(cid)

        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: 'producto o carrito no existe'
                })
            }
            
            return res.status(200).send({
                status: 'success',
                message: 'productos eliminados con exito'
            })
    }

// CONTROLLER (PUT) PARA MODIFICAR TODO EL CARRITO
    export const UpdateAllCart = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            const products = req.body

            let action = await CartsService.UpdateCart(cid,products)
            
        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: 'error en actualizar'
                })}

            return res.status(201).send({
                status: 'success',
                message: 'productos actualizados con exito'
            })

    }

// CONTROLLER (PUT) PARA ACTUALIZAR LA CANTIDAD DE UN PRODUCTO
    export const UpdateProductQty = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            const pid = req.params.pid
            const qty = req.body

            let action = await CartsService.UpdateProductQuantity(cid,pid,qty.quantity)

        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: 'error en actualizar'
                })}

            return res.status(201).send({
                status: 'success',
                message: 'producto actualizado con exito'
            })

    }

    export const PurchaseCart = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid

            let action = await TicketsService.createTicket(cid)
        //---------------RESPUESTA-------------------
            if(action==false){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay productos para agregar'
                })}

            return res.status(201).redirect('http://localhost:8080/api/products')

    }