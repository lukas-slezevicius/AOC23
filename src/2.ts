export function problem2part1(data: string) {
  const ballCounts: Record<string, number> = {
    blue: 14,
    green: 13,
    red: 12,
  };

  return data
    .split("\n")
    .map((line) => {
      const match = line.match(/Game (?<gameNumber>\d+):(?<gameText>.+)+/);
      const { gameNumber, gameText } = match!.groups!;
      const isValid = gameText
        .split(";")
        .map((s) =>
          s
            .trim()
            .split(",")
            .map((s) => {
              const arr = s.trim().split(" ");
              const count = parseInt(arr[0]);
              const color = arr[1];
              return count <= ballCounts[color];
            })
            .every((b) => b)
        )
        .every((b) => b);

      return isValid ? parseInt(gameNumber) : 0;
    })
    .reduce((a, b) => a + b, 0);
}

export function problem2part2(data: string) {
  return data
    .split("\n")
    .map((line) => {
      const match = line.match(/Game (?<gameNumber>\d+):(?<gameText>.+)+/);
      const { gameText } = match!.groups!;
      const [maxGreen, maxBlue, maxRed] = gameText
        .split(";")
        .map((s) =>
          Object.fromEntries(
            s
              .trim()
              .split(",")
              .map((s) => {
                const arr = s.trim().split(" ");
                const count = parseInt(arr[0]);
                const color = arr[1];
                return [color, count] as const;
              })
          )
        )
        .map(
          (obj) =>
            [obj["green"] ?? 0, obj["blue"] ?? 0, obj["red"] ?? 0] as const
        )
        .reduce(
          ([maxGreen, maxBlue, maxRed], [green, blue, red]) => [
            Math.max(maxGreen, green),
            Math.max(maxBlue, blue),
            Math.max(maxRed, red),
          ],
          [0, 0, 0] as const
        );

      return maxGreen * maxBlue * maxRed;
    })
    .reduce((acc, n) => acc + n, 0);
}
