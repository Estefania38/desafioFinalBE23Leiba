import { Router } from "express";
import { generateProduct } from "../utils.js";
import {addLogger} from "../helpers/logger.js";

const router = Router()

router.get('/mockingproducts', async(req,res)=>{
    const products = []
    for (let index = 0; index < 100; index++) {
        products.push(generateProduct())
    }
    res.send({ status: 'success', payload: products })
})

router.get('/loggertest', (req, res) => {

    logger.debug('Prueba debug logger')
    logger.http('Prueba http logger')
    logger.info('Prueba info logger')
    logger.warning('Prueba warning logger')
    logger.error('Prueba error logger')
    logger.fatal('Prueba fatal logger')

    res.json({ status: 'success' })
})

export {router as testRouter}