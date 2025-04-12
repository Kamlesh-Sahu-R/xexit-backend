const express = require("express");
const {User, Resignation, UserResponse, Questionnaire} = require("../../models/index");
const fetchRoleAndPermission = require("../../../helpers/fetchRoleAndPermission");
const {canSubmiteResignation} = require("../../../middleware/authorize");
const {checkCalendar} = require("../../../helpers/checkCalendar")
const {verifyToken} = require("../../../middleware/authenticate"); // JWT verification function

const router = express.Router();


const getQuestionnaireOrResponses = async (user) => {

  let questionnaire = [], responses = [];
  let userResponses = await UserResponse.findOne({user_id: user._id});

  if(!userResponses){
    questionnaire = await Questionnaire.find();
  }else{
    responses = userResponses.responses;
  }

  return {
    questionnaire,
    responses,
  };
};



router.get("/permissions", verifyToken, async (req, res) => {

  try{
    const data = await fetchRoleAndPermission(req);
    res.status(200).json({
      data,
    });
  }catch(e){
    res.status(500).json({ error: "Failed to get permission" });
  }

});



router.post("/resign", canSubmiteResignation, checkCalendar, async (req, res) => {

  const { authorization } = req.headers;
  const { lwd } = req.body; // Last working day (resignation date)

  if (!authorization) {
    return res.status(400).json({ message: 'Authorization token is required' });
  }

  const token = authorization;
  const decoded = verifyToken(token);
  const userId = decoded.payload.userId; 

  const user = await User.findById(userId);  // Find the user and update the 'lwd' field

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }


  try {

    let resignation = await Resignation.findOne({user_id: userId});
    
    if(!resignation){
      resignation = await new Resignation({
        user_id: userId,
        lwd: lwd,
      }).save();
    }

    let questionnaire = [], responses = [];

    if(resignation){

      let resp = await getQuestionnaireOrResponses(user);

      questionnaire = resp.questionnaire
      responses = resp.responses;
    }

    res.status(200).json({
      message: 'User resigned successfully',
      data: {
        resignation,
        questionnaire,
        responses,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the request' });
  }

});



router.get("/resignation", async (req, res) => {

  try {
    let resignation = await Resignation.findOne({user_id: req.user._id});
    let questionnaire = [], responses= [];
    if(resignation){
      let resp = await getQuestionnaireOrResponses(req);
      questionnaire = resp.questionnaire
      responses = resp.responses;
    }

    res.status(200).json({
      data: {
        resignation,
        questionnaire,
        responses,
      },
    });

  } catch (err) {
    res.status(500).json({ error: "resignation fetch failed" });
  }
});


router.post("/responses", async (req, res) => {
    
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(400).json({ message: 'Authorization token is required' });
    }
  
    const token = authorization;
    const decoded = verifyToken(token);
    const userId = decoded.payload.userId; 

  try{
    let resignation = await Resignation.findOne({user_id: userId});

    if(!resignation){
      res.status(400).json({
        error: "user has not resigned yet",
      });

    }else{

      let responses = await UserResponse.findOne({user_id: userId});
      if(responses){
        res.status(400).json({
          error: "responses are already recorded",
        });

      }else{
        
        const newUserResponse = new UserResponse({
          user_id: userId,
          responses: req.body.responses,
        });

        const savedResponse = await newUserResponse.save();

        res.status(200).json({
          data:{
            resignation,
            questionnaire: [],
            responses: savedResponse.responses,
          },
        });
      }
    }
  }catch (err) {
    res.status(500).json({ error: "response could not be saved" });
  }
});

module.exports = router;
