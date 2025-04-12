const express = require("express");
const {Resignation, UserResponse} = require("../../models/index");
const {canGetAllResponses, canGetAllResignation, canReviewResignation} = require("../../../middleware/authorize")

const router = express.Router();

router.get(
    "/resignations", 
    canGetAllResignation, 
    async (req, res) => {

    // console.log(req);
    // console.log("*******get resignation for admin****************");

    try{
        let resignations = await Resignation.find()
            .sort({createdAt: -1})
            .populate("user_id", "username");

        //console.log(resignations);

        res.status(200).json({ data: resignations });

    }catch(e){
        console.log(e);
        res.status(500).json({error: "Failed to fetch all resignations"});
    }
});

router.put(
    "/conclude_resignation", 
    canReviewResignation, 
    async (req, res) => {
    try{
        const {resignationId, approved, lwd } = req.body;

        //console.log("*************update resignation************");

        const updateResignation = await Resignation.findOneAndUpdate(
            {_id: resignationId},
            {
                approved,
                lwd: new Date(lwd),
            },
            {new: true}
        );

        //await updateResignation.save();

        // console.log(`updatedResignation : ${updateResignation}`);
        // console.log(req.body);
        // console.log(await Resignation.find());

        if(!updateResignation){
            return res.status(404).json({error: "Resignation not found"});
        }

        res.status(200).json({data: updateResignation});

    }catch(error){
        console.error("Error updating resignation:", error);
        if(!res.headersSent){
            res.status(500).json({error: "Internal Server Error"});
        }
    }
});

router.get(
    "/exit_responses", 
    canGetAllResponses, 
    async (req, res) => {

    try{
        let response = await UserResponse.find()
        .sort({createdAt: -1})
        .populate("user_id", "username");

    res.status(200).json({ data: response });

    }catch(e){
        console.log(e);
        res.status(500).json({error: "Failed to featch all response"});
    }
});



module.exports = router;