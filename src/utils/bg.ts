export const colors = [
  '#FDD25E',
  '#92C9BB',
  '#A2A0BB',
  '#FFE3E3',
  '#EC7357',
  '#C78A89',
  '#C8CE8D',
];
let color = colors[0];

export function getColor() {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie;
    const match = cookies.match(/bgColor=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : getRandomColor();
  }
  return '';
}

export function setColor(newColor: string) {
  color = newColor;
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty('--bg-color', color);
    document.cookie = `bgColor=${encodeURIComponent(color)}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }
}

export function setRandomColor() {
  const colorIndex = Math.floor(Math.random() * (colors.length - 1));
  setColor(colors.filter((color) => color != getColor())[colorIndex]);
}

export function getRandomColor() {
  const colorIndex = Math.floor(Math.random() * (colors.length - 1));
  return colors[colorIndex];
}
