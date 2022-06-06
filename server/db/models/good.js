const def = (db, DataTypes, options) => {
  const model = db.define(
    "good",
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    options
  );
  model.associate = (models) => {
    model.belongsTo(models.article, {
      foreignKey: "articleId",
      as: "article",
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
    model.belongsTo(models.warehouse, {
      foreignKey: "warehouseId",
      as: "warehouse",
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
  };
  return model;
};

module.exports = def;
