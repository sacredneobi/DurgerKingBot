const def = (db, DataTypes, options) => {
  const model = db.define(
    "compositionOrder",
    {
      count: DataTypes.FLOAT,
      sale: DataTypes.FLOAT,
      description: DataTypes.TEXT,
    },
    options
  );

  model.associate = (models) => {
    model.belongsTo(models.order, {
      foreignKey: "orderId",
      as: "order",
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
    model.belongsTo(models.good, {
      foreignKey: "goodId",
      as: "good",
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
  };

  return model;
};

module.exports = def;
