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
  return model;
};

module.exports = def;
