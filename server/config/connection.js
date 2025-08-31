import mongoose from "mongoose";
import fs from "fs";

const mongodbConnection = async () => {
    try {
        const env = process.env.NODE_ENV;
        
        let URI;
        
        if (env === "production") {
            const user = encodeURIComponent(process.env.DB_USER);
            const pass = encodeURIComponent(process.env.DB_PASS);
            const host = process.env.DB_HOST;
            const dbName = process.env.DB_NAME;
            
            URI = `mongodb://${user}:${pass}@${host}:27017/${dbName}?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
        } else {
            // Use local MongoDB
            const host = process.env.DB_HOST;
            const dbName = process.env.DB_NAME;
            
            URI = `mongodb://${host}:27017/${dbName}`;
        }
        
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected (${env})`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default mongodbConnection;
