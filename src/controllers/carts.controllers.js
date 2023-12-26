import { TicketsService } from "../services/tickets.service.js";
import {CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";

export class CartsController{
// CONTROLLER (POST) PARA CREAR UN NUEVO CARRITO

    static createCart= async (req,res) => {
        try{
         await CartsService.createCart()

        //---------------RESPUESTA-------------------
            return res.status(201).send({
                status: 'success',
                message: 'nuevo carrito creado con exito'
            })
        } catch(error){
            return res.status(500).send({
                status: 'error',
                message: 'Error al crear el carrito: ' + error.message
            });
        }
        
    }

    

// CONTROLLER (GET) PARA TRAER EL CARRITO POR SU ID
    static getCartById = async (req,res)=> {
        try{
             //---------------LOGICA----------------------
             const cid = req.params.cid
             const carrito = await CartsService. getCartById({_id:cid})
 
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
        catch (error) {
            return res.status(500).send(error.message);
        }

    }

// CONTROLLER (POST) PARA AGREGAR UN PRODUCTO AL CARRITO
static addToCartByID = async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).send({
              status: 'error',
              message: 'Usuario no autenticado'
            });
          }
     
      const cid = req.params.cid;
      const pid = req.params.pid;
  
      let producto = await ProductsService.getProducts({ _id: pid });
  
      if (!producto || producto.length === 0 || !producto[0] || !producto[0].owner) {
        return res.status(404).send({
          status: 'error',
          message: `Producto ${pid} no encontrado`
        });
      }
      if (producto[0].owner == req.user.email) {
        return res.status(400).send({
          status: 'error',
          message: `No puedes agregar un producto propio al carrito`
        });
      }
  
      let action = await CartsService.addProductInCart(cid, pid);
  
      //---------------RESPUESTA-------------------
      if (action === false) {
        return res.status(404).send({
          status: 'error',
          message: `Carrito ${cid} o producto ${pid} no existe`
        });
      }
  
      return res.redirect(`http://localhost:8080/api/cart/${cid}`);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: 'error',
        message: 'Se produjo un error interno al procesar la solicitud'
      });
    }
  };
  

// CONTROLLER (DELETE) PARA ELIMINAR UN PRODUCTO EN EL CARRITO
    static deleteProductInCart = async (req,res) => {

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
    static deleteAllProducts = async (req,res) => {

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
    static UpdateAllCart = async (req,res) => {

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
    static UpdateProductQty = async (req,res) => {

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

    static PurchaseCart = async (req,res) => {

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
}