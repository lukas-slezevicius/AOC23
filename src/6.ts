export function problem6part1(data: string) {
  const [timeLine, distanceLine] = data.split("\n");
  const times = timeLine.split(":")[1].trim().split(/\s+/).map(Number);
  const distances = distanceLine.split(":")[1].trim().split(/\s+/).map(Number);
  let prod = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i] + 0.0001;
    const max = (-time - Math.sqrt(time ** 2 - 4 * distance)) / -2;
    const min = (-time + Math.sqrt(time ** 2 - 4 * distance)) / -2;
    prod *= Math.floor(max) - Math.ceil(min) + 1;
  }
  return prod;
}

export function problem6part2(data: string) {
  const [timeLine, distanceLine] = data.split("\n");
  const time = parseInt(
    timeLine
      .split(":")[1]
      .trim()
      .split(/\s+/)
      .reduce((acc, s) => acc + s, "")
  );
  const distance = parseInt(
    distanceLine
      .split(":")[1]
      .trim()
      .split(/\s+/)
      .reduce((acc, s) => acc + s, "")
  );

  const max = (-time - Math.sqrt(time ** 2 - 4 * distance)) / -2;
  const min = (-time + Math.sqrt(time ** 2 - 4 * distance)) / -2;

  return Math.floor(max) - Math.ceil(min) + 1;
}
