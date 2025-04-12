const {Permission, RolePermission, UserRole} = require("../src/models/index");
const {verifyToken} = require("./authenticate");


const doesUserHavePermission = async (userId, permissionSpec) =>{

    const permission = await Permission.findOne(permissionSpec);
    const userRoles = await UserRole.find({ userId });

    const rolPermissions = await RolePermission.find({
        roleId: {$in: userRoles.map(({roleId}) => roleId)},
    });

    return rolPermissions.some(({permissionId}) => permissionId.equals(permission._id));
};



const canSubmiteResignation = async (req, res, next) => {

  const { authorization } = req.headers;
  const token = authorization;

  const decoded = verifyToken(token);
  const userId = decoded.payload.userId;
    
  // Validate input
  if (!userId) {
    return res.status(400).json({ message: 'Employee ID and Last Working Day are required' });
  }

  let userHasPermission = await doesUserHavePermission(userId, {
    subject: "resignation",
    action: "submit",
  });

  if(userHasPermission) next();
  else res.status(401).json({error: "Insufficient Permission"});
};

const canReviewResignation = async (req, res, next) => {

  const { authorization } = req.headers;
  const token = authorization;

  const decoded = verifyToken(token);
  const userId = decoded.payload.userId;

  if (!userId) {
    return res.status(400).json({ message: 'Employee ID and Last Working Day are required' });
  }
    
  let userHasPermission = await doesUserHavePermission(userId, {
    subject: "resignation",
    action: "review",
  });

  if(userHasPermission) next();
  else res.status(401).json({error: "Insufficient Permission"});

};



const canGetAllResignation = async (req, res, next) => {

  const { authorization } = req.headers;
  const token = authorization;
  console.log(token);

  const decoded = verifyToken(token);
  const userId = decoded.payload.userId;

  if (!userId) {
    return res.status(400).json({ message: 'Employee ID and Last Working Day are required' });
  }

  let userHasPermission = await doesUserHavePermission(userId, {
    subject: "resignation",
    action: "see_all",
  });

  if(userHasPermission) next();
  else res.status(401).json({error: "Insufficient Permission"});

};

const canGetAllResponses = async (req, res, next) => {
    
    const { authorization } = req.headers;
    const token = authorization;

    const decoded = verifyToken(token);
    const userId = decoded.payload.userId;
    
    // Validate input
    if (!userId) {
        return res.status(400).json({ message: 'Employee ID and Last Working Day are required' });
    }

    let userHasPermission = await doesUserHavePermission(userId, {
        subject: "responses",
        action: "see_all",
    });

    if(userHasPermission) next();
    else res.status(401).json({error: "Insufficient Permission"});
    
};

module.exports = {canSubmiteResignation, canReviewResignation, canGetAllResponses, canGetAllResignation}