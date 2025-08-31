import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const mongodbConnection = async () => {
    try {
        const env = process.env.NODE_ENV;
        let URI;
        let options = {};
        
        // Get current directory in ES modules
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        if (env === "production") {
            const user = encodeURIComponent(process.env.DB_USER);
            const pass = encodeURIComponent(process.env.DB_PASS);
            const host = process.env.DB_HOST;
            const dbName = process.env.DB_NAME;
            
            URI = `mongodb://${user}:${pass}@${host}:27017/${dbName}?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&tls=true`;
            
            // Use the correct certificate path
            const certPath = path.resolve(__dirname, "../../../certs/global-bundle.pem");
            
            // Check if certificate file exists
            if (!fs.existsSync(certPath)) {
                console.error("❌ Certificate file not found:", certPath);
                throw new Error("SSL certificate file not found");
            }
            
            console.log("📋 Using certificate from:", certPath);
            
            // Add TLS options for AWS DocumentDB
            options.tlsCAFile = certPath;
        } else {
            URI = `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`;
        }
        
        await mongoose.connect(URI, options);
        console.log(`✅ MongoDB Connected (${env})`);
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
};

export default mongodbConnection;