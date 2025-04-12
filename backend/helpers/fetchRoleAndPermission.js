const {UserRole, Permission, RolePermission, Role} = require("../src/models/index");


const fetchRoleAndPermission = async (req) => {
    
    const userRoles = await UserRole.find({
        userId: req.user._id,
    });
    

    let roles = {};

    (
        await Role.find({
            _id: {$in: userRoles.map(({roleId}) => roleId)},
        })
    ).forEach(({role}) => {
        roles[role] = true;
    });

    let permissions = {};

    if(userRoles.length){
        const rolePermissions = await RolePermission.find({
            roleId: {$in: userRoles.map(({userId}) => userId)},
        });

        if(rolePermissions.length){
            (
                await Permission.find({
                    _id: {$in: rolePermissions.map(({permissionId}) => permissionId)},
                })
            ).forEach(({action, subject}) => {
                if(!permissions[subject]) permissions[subject] = {};
                permissions[subject][action] = true;
            });
        }
    }
    return {
        roles,
        permissions,
    };
};

module.exports = {fetchRoleAndPermission};