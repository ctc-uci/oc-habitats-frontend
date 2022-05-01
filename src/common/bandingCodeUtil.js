const generateSingleBandCode = band => {
  if (!band || !band.verticalPosition || !band.colors || band.colors.length === 0) return '';
  let color;
  if (band.colors.length === 1) {
    [color] = band.colors;
  } else {
    color = `(${band.colors.join('/')})`;
  }
  if (band.verticalPosition === 'BELOW') {
    color = color.toLowerCase();
  }
  if (band.alphanumeric && band.alphanumeric !== '') {
    return `${band.flag ? 'F' : ''}${color}.${band.alphanumeric}`;
  }
  return `${band.flag ? 'F' : ''}${color}`;
};

const generateBandingCode = bands => {
  console.log(bands);
  if (!bands || !bands.topLeft || !bands.topRight || !bands.bottomLeft || !bands.bottomRight) {
    return 'invalid';
  }
  const { topLeft, topRight, bottomLeft, bottomRight } = bands;
  if (
    (topLeft?.verticalPosition === 'BELOW' && bottomLeft?.verticalPosition === 'ABOVE') ||
    (topRight?.verticalPosition === 'BELOW' && bottomRight?.verticalPosition === 'ABOVE')
  ) {
    return 'Top band must be above bottom band';
  }
  const leftCode = generateSingleBandCode(topLeft) + generateSingleBandCode(bottomLeft);
  const rightCode = generateSingleBandCode(topRight) + generateSingleBandCode(bottomRight);
  // if a leg has no bands, put X instead
  return `${leftCode || 'X'}:${rightCode || 'X'}`;
};

export default generateBandingCode;
