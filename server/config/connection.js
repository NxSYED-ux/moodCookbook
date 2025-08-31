import mongoose from "mongoose";

const mongodbConnection = async () => {
    const URI = process.env.DB_URI;
    
    try {
        await mongoose.connect(URI);
        console.log("MongoDB Connected!!!");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default mongodbConnection;