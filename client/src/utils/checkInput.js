export default (data = {}, validate = []) => {
  let error = {};

  validate.forEach((item) => {
    const { name, maxLength, minLength, errorMessage, isNull } = item;

    const val = data[name] ? data[name] : "";
    if (maxLength && val.length > maxLength) {
      error[name] = errorMessage;
    }
    if (minLength && val.length < minLength) {
      error[name] = errorMessage;
    }
    if (isNull && val.length === 0) {
      error[name] = errorMessage;
    }
  });

  error.isError = Object.keys(error).length > 0;

  return error;
};
