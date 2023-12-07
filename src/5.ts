export function problem5part1(data: string) {
  const [seedsLine, ...remainingLines] = data.split("\n");

  const seeds = seedsLine
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => parseInt(s));

  let workingNumbers = [...seeds];

  const maps = remainingLines.join("\n").trim().split("\n\n");

  maps.forEach((map) => {
    const [_, ...rest] = map.split("\n");

    const newWorkingNumbers = [...workingNumbers];
    rest
      .map((line) => line.split(" ").map((s) => parseInt(s)))
      .forEach(([destinationStart, sourceStart, range]) => {
        for (let i = 0; i < workingNumbers.length; i++) {
          const source = workingNumbers[i];
          if (sourceStart <= source && source < sourceStart + range) {
            const destination = destinationStart + (source - sourceStart);
            newWorkingNumbers[i] = destination;
          }
        }
      });

    workingNumbers = newWorkingNumbers;
  });

  return Math.min(...workingNumbers);
}

type Range = { start: number; end: number };

export function problem5part2(data: string) {
  const [seedsLine, ...remainingLines] = data.split("\n");

  const seedLineNumbers = seedsLine
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => parseInt(s));

  const seedRanges: Range[] = [];
  for (let i = 0; i < seedLineNumbers.length; i += 2) {
    const rangeStart = seedLineNumbers[i];
    const rangeLength = seedLineNumbers[i + 1];
    seedRanges.push({ start: rangeStart, end: rangeStart + rangeLength - 1 });
  }

  seedRanges.sort((a, b) => a.start - b.start);

  // We have current ranges, say, [4, 10], [12, 15], [19, 20]
  // We compute the provided source ranges with their diffs, say [1,2] [4,5] [7, 10], [12, 15]

  // We take next current range and take its start number
  // We find the first source range thats starting number is greater than or equal to the next range start number
  // There's 2 cases:
  // 1. The end of current range is smaller than end of source range
  // 2. The end of current range

  let workingRanges: { current: Range; original: Range }[] = seedRanges.map(
    (range) => ({ current: range, original: range })
  );

  const maps = remainingLines.join("\n").trim().split("\n\n");

  maps.forEach((map) => {
    const [_, ...rest] = map.split("\n");

    const newWorkingRanges: { current: Range; original: Range }[] = [];

    const mapping: { range: Range; diff: number }[] = [];

    rest
      .map((line) => line.split(" ").map((s) => parseInt(s)))
      .forEach(([destinationStart, sourceStart, range]) => {
        mapping.push({
          range: { start: sourceStart, end: sourceStart + range - 1 },
          diff: destinationStart - sourceStart,
        });
      });

    mapping.sort((a, b) => a.range.start - b.range.start);

    let currentRangeIndex = 0;
    let currentMappingIndex = 0;
    while (currentRangeIndex < workingRanges.length) {
      const { current: currentRange, original: originalRange } =
        workingRanges[currentRangeIndex];
      const currentMapping = mapping[currentMappingIndex];
      if (currentRange.start < currentMapping.range.start) {
        // Current range begins before mapping, it may or may not overlap with mapping
        if (currentRange.end < currentMapping.range.start) {
          // No overlap, we can copy the current range as is
          newWorkingRanges.push(workingRanges[currentRangeIndex]);
          currentRangeIndex++;
        } else {
          // There is overlap
          newWorkingRanges.push({
            current: {
              start: currentRange.start,
              end: currentMapping.range.start - 1,
            },
            original: {
              start: originalRange.start,
              end:
                originalRange.start +
                currentMapping.range.start -
                1 -
                currentRange.start,
            },
          });
          // Remove the front of the current range, handle the overlap in next iteration
          workingRanges[currentRangeIndex].original.start +=
            currentMapping.range.start - currentRange.start;
          workingRanges[currentRangeIndex].current.start =
            currentMapping.range.start;
        }
      } else if (currentMapping.range.end >= currentRange.start) {
        // The mapping begins before or at the current range, but ends after its start
        newWorkingRanges.push({
          current: {
            start: currentRange.start + currentMapping.diff,
            end:
              Math.min(currentRange.end, currentMapping.range.end) +
              currentMapping.diff,
          },
          original: {
            start: originalRange.start,
            end:
              originalRange.start +
              Math.min(currentMapping.range.end, currentMapping.range.end) -
              currentRange.start,
          },
        });
        if (currentRange.end < currentMapping.range.end) {
          // The current range ends before the mapping
          currentRangeIndex++;
        } else {
          // The current range ends after the mapping
          currentMappingIndex++;
        }
      } else {
        // The mapping begins before the current range, and ends before its start
        currentMappingIndex++;
      }
    }

    workingRanges = newWorkingRanges;
  });

  console.log(workingRanges);

  // return Math.min(...workingNumbers);
}
