import express from 'express';
import { auth } from '../middleware/auth';
import { Category } from '../models/category.model';
import { Reward } from '../models/reward.model';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get rewards by category
router.get('/:slug/rewards', async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const rewards = await Reward.find({ 
            category: category._id,
            isActive: true 
        }).populate('category', 'name slug icon');

        res.json(rewards);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new category (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Update category (admin only)
router.patch('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router; 