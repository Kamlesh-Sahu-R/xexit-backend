const mongoose = require("mongoose");
const config = require("../src/config/config");

const connectToDatabase = () => {
    try {
        mongoose
        .connect(
            config.mongoose.url, 
            config.mongoose.options
        )
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log(`DB connection erro: ${err}`)
        });
    } catch (err) {
        console.error(`DB connection error: ${err}`);
    }
};

// Handle graceful shutdown and closing of the database connection when the process is terminated
process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
});

module.exports = { connectToDatabase };

