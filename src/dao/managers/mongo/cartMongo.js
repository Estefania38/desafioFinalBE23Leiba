import { cartsModel } from "../../models/carts.model.js";
// import { ProductsService } from "../../../services/products.service.js";

export class CartsMongo {

  constructor() {
    this.model = cartsModel;
  };

  async getCart() {
    try {
      const carts = await this.model.find().lean();
      return carts;
    } catch (error) {
      throw new Error("Hubo un error al obtener los carritos 1");
    }
  }


  async createCart () {
    try {
        const newCart = await this.model.create({ products: [] });  

      

        return newCart;  // Devuelve el carrito creado
    } catch (error) {
        console.error('Error al crear el carrito:', error.message);
        throw new Error('Error al crear el carrito: ' + error.message);
    }
};

  async getCartById(cid) {
    try {
      const cart = await this.model.findById(cid);
      if (!cart) {
        throw new Error("Hubo un error al obtener el carrito");
      }
      return cart;
    } catch (error) {
      throw new Error("Hubo un error al obtener el carrito");
    }
  }
  async addCart(products) {
    try {
      let cartData = {};
      if (products && products.length > 0) {
        cartData.products = products;
      }

      const cart = await this.model.create(cartData);
      return cart;
    } catch (err) {
      console.error('Error al crear el carrito:', err.message);
      return err;
    }
  }
  async addProductInCart(cid, obj) {
    try {
      const filter = { _id: cid, "products._id": obj._id };
      const cart = await this.model.findById(cid);
      const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

      if (findProduct) {
        const update = { $inc: { "products.$.quantity": obj.quantity } };
        await this.model.updateOne(filter, update);
      } else {
        const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
        await this.model.updateOne({ _id: cid }, update);
      }

      return await this.model.findById(cid);
    } catch (err) {
      console.error('Error al agregar el producto al carrito:', err.message);
      return err;
    }
  }
  async deleteProductInCart(cid, products) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cid },
        { products },
        { new: true })

    } catch (err) {
      return err
    }

  }
  async update(cid, cart) {
    try {
      const cartUpdated = await this.model.findByIdAndUpdate(cid, cart, { new: true });
      return cartUpdated;
    }
    catch (error) {
      console.error(error.message);
    }
  }
  async updateOneProduct(cid, products) {

    await this.model.updateOne(
      { _id: cid },
      { products })
    return await this.model.findOne({ _id: cid })
  }
  // async AddToCart(cId, pId) {

  //   const product = await ProductsService.getProductById({ _id: pId })
  //   const cart = await this.dao.get({ _id: cId }, this.model)

  //   if (product != '' && cart != '') {
  //     console.log(cart[0]);

  //     let exist = cart[0].products.find(element => element._id._id == pId)

  //     if (!exist) {
  //       let obj = { _id: pId, quantity: 1 }
  //       await this.dao.update({ _id: cId }, { products: [...cart[0].products, obj] }, this.model)
  //       return true
  //     }

  //     exist.quantity++
  //     await this.dao.update({ _id: cId }, { products: [...cart[0].products] }, this.model)
  //     return true
  //   }

  //   return false
  // }
  async DeleteProduct(cId, pId) {

    const cartById = await this.dao.get({ _id: cId }, this.model)

    if (cartById == '') return false

    const findItem = cartById[0].products.find((item) => item._id._id == pId)

    if (cartById[0].products == [] || !findItem) return false

    const filterCart = cartById[0].products.filter((item) => item._id._id != pId)
    await this.dao.update({ _id: cId }, { products: filterCart }, this.model)


    return true
  }
  async DeleteAllProducts(cId) {

    const cartById = await this.dao.get({ _id: cId }, this.model)

    if (cartById == null) return false

    await this.dao.update({ _id: cId }, { products: [] }, this.model)

    return true
  }
  async UpdateProductQuantity(cId, pId, qty) {

    const cartById = await this.dao.get({ _id: cId }, this.model)

    if (cartById == null) return false

    let element = cartById[0].products.find((item) => item._id._id == pId)

    if (!element) return false

    element.quantity = qty
    await this.dao.update({ _id: cId }, { products: [...cartById[0].products] }, this.model)

    return true
  }
};
