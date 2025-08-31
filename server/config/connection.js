import mongoose from "mongoose";

const mongodbConnection = async () => {
    try {
        const env = process.env.NODE_ENV || "development";
        let URI;
        let options = {};
        
        if (env === "production") {
            const user = encodeURIComponent(process.env.DB_USER);
            const pass = encodeURIComponent(process.env.DB_PASS);
            const host = process.env.DB_HOST;
            const dbName = process.env.DB_NAME;
            
            // Absolute path to PEM file
            const pemPath = "/home/ubuntu/certs/global-bundle.pem";
            
            URI = `mongodb://${user}:${pass}@${host}:27017/${dbName}?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
            
            options = {
                tls: true,
                tlsCAFile: pemPath,
                tlsAllowInvalidCertificates: false, // production should validate the cert
                serverSelectionTimeoutMS: 30000,
            };
        } else {
            // Local MongoDB
            const host = process.env.DB_HOST || "localhost";
            const dbName = process.env.DB_NAME || "moodCookBook";
            URI = `mongodb://${host}:27017/${dbName}`;
        }
        
        await mongoose.connect(URI, options);
        console.log(`✅ MongoDB Connected (${env})`);
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

export default mongodbConnection;
