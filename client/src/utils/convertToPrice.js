const def = (value) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: "USD",
    style: "currency",
    currencyDisplay: "symbol",
  }).format(value);
};

export default def;
