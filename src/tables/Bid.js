module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define(
      "Bid",
      {
        bidAmount: DataTypes.FLOAT,
      }
    );
  
    return Bid;
};
