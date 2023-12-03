export function problem1Part1(data: string) {
  return data
    .split("\n")
    .map((line) => {
      const strDigits = [];
      for (let i = 0; i < line.length; i++) {
        const digit = parseInt(line[i]);
        if (isNaN(digit)) {
          continue;
        }
        strDigits.push(line[i]);
      }
      const strNumber = strDigits.at(0)! + strDigits.at(-1)!;
      return parseInt(strNumber);
    })
    .reduce((acc, n) => acc + n, 0);
}

export function problem1part2(data: string) {
  const normalizationMapping: Record<string, string> = {
    ...{
      one: "1",
      two: "2",
      three: "3",
      four: "4",
      five: "5",
      six: "6",
      seven: "7",
      eight: "8",
      nine: "9",
    },
    ...Object.fromEntries(
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => [n.toString(), n.toString()])
    ),
  };

  return data
    .split("\n")
    .map((line) => {
      const firstStr =
        normalizationMapping[
          line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/)![1]
        ];
      const lastStr =
        normalizationMapping[
          line.match(/.*(\d|one|two|three|four|five|six|seven|eight|nine)/)![1]
        ];
      return parseInt(firstStr + lastStr);
    })
    .reduce((acc, n) => acc + n, 0);
}
