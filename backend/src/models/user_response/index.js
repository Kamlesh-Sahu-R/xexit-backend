const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        responses: [
            {
                questionText: {
                    type: String,
                    required: true,
                },
                response: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);


const userResponseModel = mongoose.model("user_response", userResponseSchema);

module.exports = userResponseModel;