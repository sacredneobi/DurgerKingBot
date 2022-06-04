const def = (db, DataTypes, options) => {
  const model = db.define(
    "role",
    {
      level: DataTypes.INTEGER,
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    options
  );
  return model;
};

module.exports = def;
