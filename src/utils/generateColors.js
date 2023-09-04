/* 
    输入一个颜色的 hex，生成 n 个颜色的数组
    hexToRGB：将 hex 颜色转换为 RGB 颜色。
    rgbToHex：将 RGB 颜色转换为 hex 颜色。
    mixColors：将两个 RGB 颜色按给定的比例混合。
    然后，函数将给定颜色转换为 RGB 颜色，并创建一个空数组来存储生成的颜色。
    接下来，函数循环 n-1 次，每次计算下一个颜色，将其添加到数组中。
    计算下一个颜色时，函数使用 mixColors 函数将给定颜色和蓝色混合，并使用一个递增的权重值来控制混合的程度。
    如果计算出来的颜色过于浅色，则使用红色代替蓝色。
*/
export default function generateColors(color, n) {
  const hexToRGB = (hex) =>
    hex
      .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));

  const rgbToHex = (rgb) =>
    '#' +
    rgb
      .map((x) => Math.max(0, Math.min(255, Math.round(x))))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');

  const mixColors = (color1, color2, weight) =>
    color1.map((x, i) => Math.round(x * weight + color2[i] * (1 - weight)));

  const rgbColor = hexToRGB(color);
  let colors = [color];
  let weight = 0.5;
  for (let i = 0; i < n - 1; i++) {
    let nextColor = mixColors(rgbColor, [0, 0, 255], weight);
    if (nextColor[0] > 200 && nextColor[1] > 200 && nextColor[2] > 200) {
      nextColor = mixColors(rgbColor, [255, 0, 0], weight);
    }
    colors.push(rgbToHex(nextColor));
    weight += 0.15;
  }
  return colors;
}