import mongoose from "mongoose";
import bcrypt from "bcrypt";


const user = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password:{type: String, required: true},
    isAdmin:{type: Boolean, default: false}
}, {
    toJSON: {
        transform: (doc, ret)=>{
            delete ret.password
            delete ret.isAdmin
            return ret
        }
}})
// retrieving data from confirmPassword field
user.virtual("confirmPassword").set(function(passwordValue){
    this._confirmPassword =  passwordValue;
})

//ensure the password and confirmPassword match
user.pre("validate", function(next){
    if(this.isModified("password") && this._confirmPassword != this.password){
        this.invalidate("confirmPassword", "Passwords do not match");
    }
    next();

})

user.pre("save", function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next()
})
const USER = mongoose.model("User", user);

export default USER;