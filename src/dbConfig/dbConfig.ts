// who is capable of connecting with mongoDb -> mongoose
import mongoose from "mongoose";

// we are talking to database and its in different part so its always in async method
export async function connect() {
    try {
        // string of mongoose connectiong (! means it will always be available)
        mongoose.connect(process.env.MONGO_URL!)
        // grab a connection
        const connection = mongoose.connection;
        // listening to an events
        connection.on( 'connected' , () => {
            console.log("MongoDb connected successfully.")
        })
        // listeing to an error
        connection.on( 'error', (err) => {
            console.log("MongoDb connection error, Please make sure MongoDb is running, "+err)
            process.exit()
        })
        
    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}