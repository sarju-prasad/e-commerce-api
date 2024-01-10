import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.reopsitory.js";

export class CartItemsController {
    constructor(){
        this.cartItemsRepository=new CartItemsRepository();
    }
    async add(req, res) {
        try{
            const { productID, quantity } = req.body;
            const userID = req.userID;
           await this.cartItemsRepository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated");
        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong adding the cart items");
          }
    }

    async get(req, res){
        try{
            const userID = req.userID;
            const items =await this.cartItemsRepository.get(userID);
            return res.status(200).send(items);
        } 
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong getting the cart items");
          }
    }

    async delete(req, res) {
        try{
            const userID = req.userID;
            const cartItemID = req.params.id;
            const error = await this.cartItemsRepository.delete(
            cartItemID,
            userID
        );
        if (error) {
            return res.status(404).send(error);
        }
        return res
        .status(200)
        .send('Cart item is removed');
        }  catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong getting the cart items");
          }
    }
}