const mongoose = require("mongoose");

const { generateHash } = require("../utils/hashProvider.js");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
    },
    
},
{
     timestamps: true,
}
);

UserSchema.pre("save", async function(){
    const user = this;

    if (!user.isModified("password")) return;

    user.password = await generateHash(user.password);

}); 

UserSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate();

    if (update.password) {
        update.password = await generateHash(update.password);
    }
})

module.exports = mongoose.model("users", UserSchema)