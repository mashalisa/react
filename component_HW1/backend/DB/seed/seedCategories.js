const { v4: uuidv4 } = require('uuid');
const Category = require('../models/category');

const categories = [
  'entertainment',
  'bills',
  'groceries',
  'dining out',
  'transportation',
  'shopping',
  'other',
];

async function seedCategories() {
  try {
    await Category.bulkCreate(
      categories.map(name => ({
        id: uuidv4(),
        name,
      })),
      { ignoreDuplicates: true }
    );
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
}

if (require.main === module) {
  seedCategories().then(() => process.exit(0));
}

module.exports = seedCategories; 