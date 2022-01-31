const formatValueReverse = (input) => {
  if (input) {
    input = Math.round(input).toFixed(2);
    input = String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
  return input;
};
const formatValue = (input) => {
  if (input) {
    input = Math.round(input);
    input = String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
  return input;
};

export default {
  formatValueReverse,
  formatValue,
};
