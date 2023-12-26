import { cartDao } from "../dao/factory.js";

export class CartsService {
    static  getCart = async () => {
        return await cartDao. getCart();
    }
    static  getCartById = async (cid) => {
        return await cartDao. getCartById(cid);
    }
    static createCart= async (cart) => {
        return await cartDao.createCart(cart);
    }
    static addCart  = async (products) => {
        return await cartDao.addCart (products);
    }
    static  addProductInCart = async (cid, obj) => {
        return await cartDao. addProductInCart(cid, obj);
    }
    static  UpdateCart = async (cId,productos) => {
        return await cartDao.update(cId,productos);
    }
    static deleteProductInCart = async (cid, products) => {
        return await cartDao.deleteProductInCart(cid, products);
    }
    static updateOneProduct = async (cid, products) => {
        return await cartDao.updateOneProduct(cid, products);
    }    
    static AddToCart = async (cId, pId) =>{
        return await cartDao.AddToCart(cId, pId);
    }
    static DeleteProduct = async (cId,pId) =>{
        return await cartDao.DeleteProduct(cId, pId);            
    }
    static DeleteAllProducts = async (cId) =>{
        return await cartDao. DeleteAllProducts(cId);  
    }
    static UpdateProductQuantity = async (cId,pId,qty) =>{
        return await cartDao.UpdateProductQuantity(cId,pId,qty);        
    }            
}