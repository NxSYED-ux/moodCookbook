import mongoose from "mongoose";
import fs from "fs";

const mongodbConnection = async () => {
    try {
        const env = process.env.NODE_ENV;
        let URI;
        let options = {};
        
        if (env === "production") {
            const user = encodeURIComponent(process.env.DB_USER);
            const pass = encodeURIComponent(process.env.DB_PASS);
            const host = process.env.DB_HOST;
            const dbName = process.env.DB_NAME;
            
            URI = `mongodb://${user}:${pass}@${host}:27017/${dbName}?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
            
            options = {
                ssl: true,
                sslValidate: true,
                sslCA: fs.readFileSync("/home/ubuntu/certs/global-bundle.pem"),
            };
        } else {
            const host = process.env.DB_HOST;
            const dbName = process.env.DB_NAME;
            URI = `mongodb://${host}:27017/${dbName}`;
        }
        
        await mongoose.connect(URI, options);
        console.log(`MongoDB Connected (${env})`);
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

export default mongodbConnection;
