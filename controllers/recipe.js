import express from 'express';
import RECIPES from '../models/recipe.js';
import isSignedIn from '../middleware/isSignedIn.js';
const router = express.Router();

// ? Create
router.post("", isSignedIn, async (req, res, next) => {
    try {
        // req.body.author = req.user._id
        const recipe = await RECIPES.create(req.body)
        res.status(201).json(recipe)
    } catch (error) {
        next()
    }
});

// ? Index
router.get("", async (req, res, next) => {
    try {
        const recipes = await RECIPES.find().populate('author')
        res.json(recipes)
    } catch (error) {
        next()
    }

});

//? Show Page
router.get("/:recipeId", async (req, res, next) => {
    try {
        const { recipeId } = req.params
        const recipe = await RECIPES.findById(recipeId).populate(['author', 'comments.commenter'])
        if (!recipe) throw new Error('Recipe not found')
        res.json(recipe)
    } catch (error) {
        next()
    }
})

// ? Update
router.put("/:recipeId", isSignedIn, async (req, res, next) => {
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
        next()
    }
})

router.delete("/:recipeId", isSignedIn, async (req, res, next) => {
    try {
        const { recipeId } = req.params
        const recipe = await RECIPES.findById(recipeId)
        if (!recipe) throw new Error('recipe not found')
        
        // add in when user is defined
        // if(!recipe.author.equals(req.user._id)) {
        //    throw new Error('No permission to access')
        // }

        await RECIPES.findByIdAndDelete(recipeId)
        res.json({message: 'Recipe deleted successfully'})

    } catch (error) {
        next()
    }
})
router.post("/:recipeId/comments", isSignedIn, async (req, res, next) => {
    try {
        const recipeId =  req.params.recipeId;
        const recipe = await RECIPES.findById(recipeId)
        if(!recipe) throw new Error("Recipe not found")
        const comment = req.body;
        recipe.comments.push(comment)

        // const updated_comment = recipe.comments[recipe.comments.length-1];
        // updated_comment.author = req.user._id;

        // await recipe.save();
        // res.status(201).json(recipe.comments[recipe.comments.length-1])

    } catch (error) {
        next()
    }
})

export default router;
