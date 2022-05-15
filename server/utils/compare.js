const isString = (param) => {
  return typeof param === "string";
};

const compareString = (leftString, rightString) => {
  if (!isString(leftString) || !isString(rightString)) {
    return false;
  }
  return leftString.toUpperCase() === rightString.toUpperCase();
};

const compareStringInArray = (itemString, arrayItems) => {
  if (!itemString || !Array.isArray(arrayItems)) {
    return false;
  }
  let findItem = arrayItems.filter((item) => {
    return compareString(item, itemString);
  });
  return findItem.length > 0;
};

module.exports = { compareString, compareStringInArray };
