export const interpolatePoints = (x1, y1, x2, y2) => {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const step = 1 / distance;
  const points = [];

  for (let t = 0; t <= 1; t += step) {
    const x = x1 + t * (x2 - x1);
    const y = y1 + t * (y2 - y1);
    points.push({ x, y });
  }

  return points;
};
