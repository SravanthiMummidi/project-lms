const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        const db = mongoose.connection;

        db.once("open", () => {
            console.log("DB connected");

            const msgCollection = db.collection("messagecontents");
            const changeStream = msgCollection.watch();

            changeStream.on("change", (change) => {
                console.log("A change occured", change);

                if (change.operationType === "insert") {
                    const messageDetails = change.fullDocument;
                    pusher.trigger("message", "inserted", {
                        name: messageDetails.name,
                        message: messageDetails.message,
                        timestamp: messageDetails.timestamp,
                        received: messageDetails.received,
                    });
                } else {
                    console.log("Error triggering Pusher");
                }
            });
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;