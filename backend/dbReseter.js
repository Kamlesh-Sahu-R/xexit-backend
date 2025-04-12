const mongoose = require("mongoose");
const config = require('./src/config/config');
const {User, Role, Permission, RolePermission, UserRole, Questionnaire} = require("./src/models/index");

const url = config.mongoose.url;

const adminUser = {
    _id: "67e95b1b78c54ab82b242d2d",
    username: "admin",
    password: "admin",
    createdAt: new Date("2024-09-15T09:14:28.346+00:00"),
    updatedAt: new Date("2024-09-15T09:14:28.346+00:00"),
};

const roles = [
    { _id: "67e95b1b78c54ab82b242d30", role: "admin" },
    { _id: "67e95e8b6553bf02008d12f0", role: "employee" },
];

const permissions = [
    { _id: "67e95b1b78c54ab82b242d32", subject: "resignation", action: "submit" },
    { _id: "67e98d397e7b555e0b3148a4", subject: "resignation", action: "review" },
    { _id: "67e98eb98c1f0a43e010e54e", subject: "resignation", action: "see_all" },
    { _id: "67e99006bbb805dbb84d497c", subject: "responses", action: "see_all" },
    { _id: "67e95b1b78c54ab82b242d34", subject: "lwd", action: "update" },
];

const userRole = {
        _id: "67e95b1b78c54ab82b242d01",
        userId: "67e95b1b78c54ab82b242d2d",
        roleId: "67e95b1b78c54ab82b242d30",
};

const rolePermissions = [
    {
        _id: "67e95b1b78c54ab82b242d36",
        permissionId: "67e95b1b78c54ab82b242d32",
        roleId: "67e95e8b6553bf02008d12f0",
    },
    {
        _id: "67e95b1b78c54ab82b242d37",
        permissionId: "67e98d397e7b555e0b3148a4",
        roleId: "67e95b1b78c54ab82b242d30",
    },
    {
        _id: "67e95b1b78c54ab82b242d38",
        permissionId: "67e98eb98c1f0a43e010e54e",
        roleId: "67e95b1b78c54ab82b242d30",
    },
    {
        _id: "67e95b1b78c54ab82b242d39",
        permissionId: "67e99006bbb805dbb84d497c",
        roleId: "67e95b1b78c54ab82b242d30",
    },
    {
        _id: "67e95b1b78c54ab82b242d40",
        permissionId: "67e95b1b78c54ab82b242d34",
        roleId: "67e95b1b78c54ab82b242d30",
    },       
];

const questionnaires = [
    {
        _id: "67e962e3c316943b6b332571",
        questionText: "What promted you to start looking for another job?",
        options: [],
    }, 
    {
        _id: "67e962e3c316943b6b332572",
        questionText: "What did you like most about your job?",
        options: [],
    }, 
    {
        _id: "67e962e3c316943b6b332573",
        questionText: "What did you like least about your job?",
        options: [],
    },
    {
        _id: "67e962e3c316943b6b332574",
        questionText: "Do you feel your job responsibilites were clear?",
        options: [],
    },
    {
        _id: "67e962e3c316943b6b332575",
        questionText: "What you recommend this compony to others?",
        options: [],
    }, 
    
];

const resetDatabase = async () => {
    try{
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,});
        console.log("Connected to MongoDB by reset db");

        //Drop collections
        await mongoose.connection.db.dropDatabase();
        console.log("Database dropped successfully");

        //Seed Data
        await User.create(adminUser);
        await Role.insertMany(roles);
        await Permission.insertMany(permissions);
        await UserRole.create(userRole);
        await RolePermission.insertMany(rolePermissions);
        await Questionnaire.insertMany(questionnaires);

        console.log("Database seeded successfully");

    }catch(e){
        console.error("Error resetting the database:", e);
    }
};

resetDatabase();