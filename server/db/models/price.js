const def = (db, DataTypes, options) => {
  const model = db.define(
    "price",
    {
      purchase: DataTypes.FLOAT,
      sale: DataTypes.FLOAT,
      description: DataTypes.TEXT,
    },
    options
  );
  model.associate = (models) => {
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
