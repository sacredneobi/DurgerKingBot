const def = (db, DataTypes, options) => {
  const model = db.define(
    "article",
    { caption: DataTypes.TEXT, description: DataTypes.TEXT },
    options
  );
  return model;
};

module.exports = def;
