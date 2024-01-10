import { MongoClient } from "mongodb";

let client;

export const connectToMongoDB = async () => {
    try {
        client = await MongoClient.connect(process.env.DB_URL);
        console.log("MongoDB is connected");
        await createCounter(client.db());
    } catch (err) {
        console.error(err);
    }
};

export const getDB = () => {
    return client.db();
};

const createCounter = async (db) => {
    // console.log(db.collection("counters"));
    try {
        const existingCounter = await db.collection("counters").findOne({_id:"cartItemId"});

        if (!existingCounter) {
            await db.collection("counters").insertOne({ _id: 'cartItemId', value: 0 });
            console.log("Counter created successfully");
        }
    } catch (error) {
        console.error("Error creating counter:", error);
    }
};

// Call connectToMongoDB to initiate the connection
// connectToMongoDB();
