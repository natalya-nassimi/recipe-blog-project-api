import express from 'express';
import RECIPES from '../models/recipe.js';
const router = express.Router();

// ? Create
router.post("", async (req, res) => {
    try {
        // req.body.author = req.user._id
        const recipe = await RECIPES.create(req.body)
        res.status(201).json(recipe)
    } catch (error) {
        console.log(error)
    }
});

// ? Index
router.get("", async (req, res) => {
    try {
        const recipes = await RECIPES.find().populate('author')
        res.json(recipes)
    } catch (error) {
        console.log(error)
    }

});

//? Show Page
router.get("/:recipeId", async (req, res) => {
    try {
        const { recipeId } = req.params
        const recipe = await RECIPES.findById(recipeId).populate(['author', 'comments.commenter'])
        if (!recipe) throw new Error('Recipe not found')
        res.json(recipe)
    } catch (error) {
        console.log(error)
    }
})

// ? Update
router.put("/:recipeId", async (req, res) => {
    try {
        const { recipeId } = req.params
        const recipe = await RECIPES.findById(recipeId)
        if (!recipe) throw new Error('Recipe not found')

        // add in when user is defined
        // if(!recipe.author.equals(req.user._id)) {
        // throw new Error('No permission to access') }

        const updatedRecipe = await RECIPES.findByIdAndUpdate(recipeId, req.body, { returnDocument: 'after' })
        res.json(updatedRecipe)

    } catch (error) {
        console.log(error)
    }
})

router.delete("/recipeId", (req, res) => {

})
router.post("/:recipeId/reviews", (req, res) => {

})

export default router;
