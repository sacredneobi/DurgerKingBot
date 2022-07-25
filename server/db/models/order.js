const def = (db, DataTypes, options) => {
  const model = db.define(
    "order",
    {
      description: DataTypes.TEXT,
      isPayment: DataTypes.BOOLEAN,
    },
    options
  );

  model.associate = (models) => {
    model.belongsTo(models.client, {
      foreignKey: "clientId",
      as: "client",
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
  };

  return model;
};

module.exports = def;
