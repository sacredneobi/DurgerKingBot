const def = (db, DataTypes, options) => {
  const model = db.define(
    "user",
    {
      name: DataTypes.TEXT,
      password: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    options
  );

  model.associate = (models) => {
    model.belongsTo(models.role, {
      foreignKey: "roleId",
      as: "role",
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
  };

  return model;
};

module.exports = def;
