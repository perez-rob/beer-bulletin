const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

const Offer = require("./Offer");
const User = require("./User");
const Trade = require("./Trade");

User.hasMany(Trade, {
  // Define the third table needed to store the foreign keys
  foreignKey: "user_id",
  // Define an alias for when data is retrieved
  as: "user_trades",
});

Trade.hasMany(Offer, {
  foreignKey: "trade_id",
});

Offer.belongsTo(User, {
  foreignKey: "participant_id",
  as: "participant",
});

const db = {
  users: User,
  offers: Offer,
  trades: Trade,
  sequelize: sequelize,
  Sequelize: Sequelize,
};

module.exports = db;
