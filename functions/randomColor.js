module.exports = function randomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const decimalColorCode = (red << 16) + (green << 8) + blue;
  return decimalColorCode;
}