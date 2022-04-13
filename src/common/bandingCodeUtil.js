const generateSingleBandCode = band => {
  if (!band.verticalPosition || !band.colors || band.colors.length === 0) return '';
  let color;
  if (band.colors.length === 1) {
    color = band.colors[0].realValue;
  } else {
    color = `(${band.colors.map(c => c.realValue).join('/')})`;
  }
  if (band.verticalPosition === 'below') {
    color = color.toLowerCase();
  }
  if (band.alphanumeric && band.alphanumeric !== '') {
    return `${band.flag ? 'F' : ''}${color}.${band.alphanumeric}`;
  }
  return `${band.flag ? 'F' : ''}${color}`;
};

const generateBandingCode = bands => {
  if (!bands || !bands[0]) {
    return 'invalid';
  }
  const [topLeft, topRight, bottomLeft, bottomRight] = bands;
  if (
    (topLeft.verticalPosition === 'below' && bottomLeft.verticalPosition === 'above') ||
    (topRight.verticalPosition === 'below' && bottomRight.verticalPosition === 'above')
  ) {
    return 'Top band must be above bottom band';
  }
  const leftCode = generateSingleBandCode(topLeft) + generateSingleBandCode(bottomLeft);
  const rightCode = generateSingleBandCode(topRight) + generateSingleBandCode(bottomRight);
  // if a leg has no bands, put X instead
  return `${leftCode || 'X'}:${rightCode || 'X'}`;
};

export default generateBandingCode;
