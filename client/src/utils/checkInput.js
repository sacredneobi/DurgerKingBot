import { getValue } from "./utils";

function convert(args, template) {
  return template.replace(/\$\{(\w+)\}/g, (m, n) => {
    return args[n] !== undefined && args[n] !== null ? args[n] : m;
  });
}

export default (data = {}, validate = []) => {
  let error = {};

  validate.forEach((item) => {
    const { name, maxLength, minLength, isNotNull, minValue, maxValue } = item;

    const val = getValue(data, name) ? getValue(data, name) : "";
    if (maxLength && val.trim().length > maxLength.val) {
      error[name] = convert({ val: maxLength.val }, maxLength.errorMessage);
    }
    if (minLength && val.trim().length < minLength.val) {
      error[name] = convert({ val: minLength.val }, minLength.errorMessage);
    }
    if (minValue && minValue.val >= (parseFloat(val) ? parseFloat(val) : 0)) {
      error[name] = convert({ val: minValue.val }, minValue.errorMessage);
    }

    if (maxValue && parseFloat(val) > maxValue.val) {
      error[name] = convert({ val: maxValue.val }, maxValue.errorMessage);
    }

    if (isNotNull && val.length === 0) {
      error[name] = isNotNull.errorMessage;
    }
  });

  error.isError = Object.keys(error).length > 0;

  return error;
};
