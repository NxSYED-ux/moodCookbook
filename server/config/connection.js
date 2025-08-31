import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import https from 'https';

const downloadCertificate = async (certPath) => {
    return new Promise((resolve, reject) => {
        console.log("📥 Downloading fresh AWS RDS certificate...");
        const file = fs.createWriteStream(certPath);
        
        https.get('https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem', (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log("✅ Certificate downloaded successfully");
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(certPath, () => {});
            reject(err);
        });
    });
};

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
            
            // Get current directory in ES modules
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            
            // Use the correct certificate path
            const certDir = path.resolve(__dirname, "../../../certs");
            const certPath = path.resolve(certDir, "global-bundle.pem");
            
            // Ensure cert directory exists
            if (!fs.existsSync(certDir)) {
                fs.mkdirSync(certDir, { recursive: true });
            }
            
            // Download fresh certificate if needed
            if (!fs.existsSync(certPath)) {
                await downloadCertificate(certPath);
            }
            
            console.log("📋 Using certificate from:", certPath);
            
            // Read certificate content
            const certContent = fs.readFileSync(certPath);
            
            options = {
                ssl: true,
                sslValidate: true,
                sslCA: certContent,
            };
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