export function problem3part1(data: string) {
  const grid = data.split("\n").map((line) => line.split(""));

  const numberRanges = grid.map((row) =>
    Array.from(row.join("").matchAll(/\d+/g)).map(
      (match) =>
        [match.index!, match.index! + match[0].length] as [
          start: number,
          end: number
        ]
    )
  );

  let sum = 0;
  for (let y = 0; y < numberRanges.length; y++) {
    for (const [start, end] of numberRanges[y]) {
      // Check if the range is valid
      let isValid = false;

      for (let x = start - 1; x < end + 1; x++) {
        // The col range is too wide by 1 on each side

        if (x < 0 || x >= grid[y].length) {
          continue;
        }

        if (x === start - 1 || x === end) {
          if (grid[y][x] !== ".") {
            isValid = true;
            break;
          }
        }

        if (y > 0) {
          if (grid[y - 1][x] !== ".") {
            isValid = true;
            break;
          }
        }

        if (y < grid.length - 1) {
          if (grid[y + 1][x] !== ".") {
            isValid = true;
            break;
          }
        }
      }

      if (isValid) {
        sum += parseInt(grid[y].slice(start, end).join(""));
      }
    }
  }

  return sum;
}

export function problem3part2(data: string) {
  const grid = data.split("\n").map((line) => line.split(""));

  const numberRanges = grid.map((row) =>
    Array.from(row.join("").matchAll(/\d+/g)).map(
      (match) =>
        [match.index!, match.index! + match[0].length] as [
          start: number,
          end: number
        ]
    )
  );

  let sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "*") {
        sum += getGearRatio(y, x, numberRanges, grid);
      }
    }
  }

  return sum;
}

function getGearRatio(
  y: number,
  x: number,
  numberRanges: [number, number][][],
  grid: string[][]
) {
  const adjacentRanges: [range: [number, number], y: number][] = [];
  for (const dy of [-1, 0, 1]) {
    if (y + dy < 0 || y + dy >= numberRanges.length) {
      continue;
    }

    for (const [start, end] of numberRanges[y + dy]) {
      // We want x + dx to be in the range [start, end)
      for (const dx of [-1, 0, 1]) {
        if (x + dx >= start && x + dx < end) {
          adjacentRanges.push([[start, end], y + dy]);
          break;
        }
      }
    }
  }

  if (adjacentRanges.length !== 2) {
    return 0;
  }

  const [leftRange, leftY] = adjacentRanges[0];
  const [rightRange, rightY] = adjacentRanges[1];

  return (
    parseInt(grid[leftY].slice(leftRange[0], leftRange[1]).join("")) *
    parseInt(grid[rightY].slice(rightRange[0], rightRange[1]).join(""))
  );
}
