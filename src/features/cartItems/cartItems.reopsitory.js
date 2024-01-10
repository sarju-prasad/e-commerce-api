import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class CartItemsRepository{
    constructor(){
        this.collection="cartItems"
    }

    async get(userID){
       try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const cart= await collection.find({userID:new ObjectId(userID)}).toArray();
            // console.log(cart);
            return cart;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async add(productID, userID, quantity){
        try{
            // 1 . Get the db.
            const db=getDB();
            const collection = db.collection(this.collection);
            const id=await this.getNextCounter(db);
            console.log("id calue",id)
;            return await collection.updateOne(
                {
                    productID:new ObjectId(productID),
                    userID:new ObjectId(userID),
                },
                {   $setOnInsert:{_id:id},
                    $inc:{
                        quantity:quantity
                    }
                },
                {
                    upsert:true,
                }
            );
            
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async delete(cartItemID, userID){
        try{
            const db=getDB();
            const collection = db.collection(this.collection);
            await collection.deleteOne(
                {
                    _id:new ObjectId(cartItemID),
                    userID:new ObjectId(userID)
                }
            )
    
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async getNextCounter(db){
        const counter=await db.collection("counters").findOneAndUpdate(
            {_id:'cartItemId'},
            {$inc:{value:1}},
            {returnDocument:"after"}
        )
        console.log(counter.value.value);
        return counter.value;
    }
}