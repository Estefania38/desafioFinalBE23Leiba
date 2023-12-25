import bcrypt from "bcrypt";
import path from 'path';
import { fileURLToPath } from 'url';
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
import jwt from "jsonwebtoken";
import { config } from "./config/config.js"
import { fakerES as faker } from '@faker-js/faker'

// aca creo la clave secreta del token

const SECRET_TOKEN_KEY =config.token.password;
export const JWT_PRIVATE_KEY = process.env.SECRET_TOKEN_KEY
export const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME


export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (userDB, password)=>{
   return bcrypt.compareSync(password, userDB.password); 
};

export const generateToken = (userInfo)=>{
    const token = jwt.sign(userInfo,SECRET_TOKEN_KEY);
    return token;
};
export const validateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    if(!authHeader){
        return res.json({status:"error",message:"No autorizado"})
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token,SECRET_TOKEN_KEY,(err,payload)=>{
        if(err) return res.json({status:"error", message:"token no valido"});
        req.user = payload;
        next();
    })
}

export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null
}

export const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) return next(err)
            if (!user) return res.status(401).render('errors/base', { error: info.messages ? info.message : info.toString()})
            req.user = user
            next()
        })(req, res, next)
    }
}

export const UserPass = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) return next(err)
            if (!user) return res.status(401).render('errors/base', { error: info.messages ? info.message : info.toString()})
            if(user.user.rol=='admin') return res.status(401).render('errors/auth',{ error: 'Solo pueden acceder un User'})
            req.user = user
            next()
        })(req, res, next)
    }
}

export const generateProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int(),
        category:faker.commerce.productMaterial(),
        image: faker.image.urlPicsumPhotos()
    }
}