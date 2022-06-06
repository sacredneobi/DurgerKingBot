const def = (db, DataTypes, options) => {
  const model = db.define(
    "addonProps",
    {
      dimension: DataTypes.TEXT,
      type: DataTypes.TEXT,
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
