const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        max: 26,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        max: 26,
        trim: true,
    },
    role: {
        type: String,
        default: "user"
    }
},{timestamps: true})

userSchema.pre("save", async function(next){
    const user = this
  user.password = await bcrypt.hash(user.password, 10)
    next()
})

userSchema.methods.authenticate = function (password) {
    const user = this
    return bcrypt.compare(password, user.password)

}

module.exports = mongoose.model("users", userSchema)