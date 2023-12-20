//Database Connection using Mongoose
import mongoose from "mongoose";

const database = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "blogify"
    })
        .then((c) => {
            console.log(`Database connected successfully with ${c.connection.host}`);
        })
        .catch((error) => {
            console.log(error);
        });
}

export default database;