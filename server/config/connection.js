import mongoose from "mongoose";

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
            
            URI = `mongodb://${user}:${pass}@${host}:27017/${dbName}`;
            
            options = {
                tls: true,
                tlsCAFile: "/home/ubuntu/certs/global-bundle.pem",
            };
        } else {
            URI = `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`;
        }
        
        await mongoose.connect(URI);
        console.log(`MongoDB Connected (${env})`);
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

export default mongodbConnection;
