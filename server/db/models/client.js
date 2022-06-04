const def = (db, DataTypes, options) => {
  const model = db.define(
    "client",
    {
      first: DataTypes.TEXT,
      last: DataTypes.TEXT,
      chatId: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    options
  );
  return model;
};

module.exports = def;
