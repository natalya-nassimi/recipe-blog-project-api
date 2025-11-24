import mongoose from "mongoose";

const ingredient = {
    name: {type: String, required: true},
    measurement: {type: Number, required: true},
    unit: {type: String, required: true, enum:['cup', 'gallon', 'gram', 'litre', 'kilogram', 'ounce', 'quart', 'tbsp']}
}
const comment = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    rating: {type: Number},
    description: {type: String, required: true},
}, {timestamps: true}) 

const recipe = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: {type:[ingredient], required: true},
    preparationTime: {type: Number},
    instructions: {type: [String], required: true},
    image: {type: String},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [comment]
}, {timestamps: true});


const RECIPES = mongoose.model("Recipes", recipe);

export default RECIPES;