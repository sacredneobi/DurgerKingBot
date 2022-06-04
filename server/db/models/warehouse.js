const def = (db, DataTypes, options) => {
  const model = db.define(
    "warehouse",
    {
      count: DataTypes.TEXT,
      availability: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    options
  );
  return model;
};

module.exports = def;
