import app from './app';
import mongoose from 'mongoose';
import { CONFIG } from './config/config';
import transactionRoutes from './routes/transaction.routes';
import { Category } from './models/category.model';  // Make sure path is correct

const PORT = CONFIG.PORT || 5000;

const categoriesList = [
  { _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'), name: 'Gaming', slug: 'gaming', icon: '🎮', description: 'Gaming rewards' },
  { _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'), name: 'Shopping', slug: 'shopping', icon: '🛍️', description: 'Shopping rewards' },
  { _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439013'), name: 'Entertainment', slug: 'entertainment', icon: '🎬', description: 'Entertainment rewards' },
  { _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439014'), name: 'Food & Drinks', slug: 'food-drinks', icon: '🍽️', description: 'Food & Drinks rewards' },
  { _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439015'), name: 'Travel', slug: 'travel', icon: '✈️', description: 'Travel rewards' },
];

// Function to seed categories if not present
const seedCategories = async () => {
  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany(categoriesList); 
      console.log('✅ Categories seeded successfully');
    } else {
      console.log('✅ Categories already exist, skipping seeding');
    }
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
  }
};

console.log(CONFIG.MONGODB_URI)

// Connect to MongoDB
mongoose.connect(CONFIG.MONGODB_URI!)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');

    // Seed categories
    // await seedCategories();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`Environment: ${CONFIG.NODE_ENV}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

// Routes
app.use('/api/transactions', transactionRoutes);

export default app;
