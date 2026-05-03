import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = async () => {
    try {
        const DB = process.env.DATABASE.replace(
            '<PASSWORD>',
            process.env.DATABASE_PASSWORD
        );

        const conn = await mongoose.connect(DB, {
            dbName: 'retail_store',
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDatabase;
