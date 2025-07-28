const Budgets = require('./DB/models/budjets');
const sequelize = require('./configDB/sequelize');

sequelize.sync({ force: true }).then(() => {
  console.log('Synced!');
  process.exit(0);
});