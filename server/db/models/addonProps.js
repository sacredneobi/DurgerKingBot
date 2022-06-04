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
  return model;
};

module.exports = def;
