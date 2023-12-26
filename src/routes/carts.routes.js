import { Router } from "express";
import { CartsController } from "../controllers/carts.controllers.js";
import { __dirname } from "../utils.js";
import { UserPass } from "../utils.js";
import { checkAuthenticated } from "../middlewares/auth.js";
const router = Router()

router.post('/', checkAuthenticated, CartsController.createCart)



router.get('/:cid', CartsController.getCartById)

router.post('/:cid/product/:pid',checkAuthenticated, CartsController.addToCartByID),
//UserPass('current'),

router.delete('/:cid/products/:pid', CartsController.deleteProductInCart )

router.delete('/:cid', CartsController.deleteAllProducts)

router.put('/:cid', CartsController.UpdateAllCart)

router.put('/:cid/products/:pid', CartsController.UpdateProductQty)

router.post('/:cid/purchase', CartsController.PurchaseCart)


export { router as cartsRouter };