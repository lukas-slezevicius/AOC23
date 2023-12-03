import fs from "fs";
import { problem1Part1, problem1part2 } from "./1";
import { problem2part1, problem2part2 } from "./2";

const solutions: Record<number, Record<number, (data: string) => any>> = {
  1: {
    1: problem1Part1,
    2: problem1part2,
  },
  2: {
    1: problem2part1,
    2: problem2part2,
  },
};

function main(problem: number, part: number, mode: "real" | "test") {
  console.log("Problem:", problem);
  console.log("Part:", part);
  console.log("Mode:", mode);

  const data = fs.readFileSync(`data/${problem}/${mode}/${part}.txt`, "utf8");

  const result = solutions[problem][part](data);

  console.log("Result:", result);
}

function parseArgs() {
  const firstArg = process.argv[2] as string | undefined;
  const secondArg = process.argv[3] as string | undefined;
  const thirdArg = process.argv[4] as string | undefined;

  if (!firstArg) {
    console.error("Provide the problem number as the first argument.");
    process.exit(1);
  }

  const problem = parseInt(firstArg);

  if (isNaN(problem)) {
    console.error("The first argument is not a valid integer.");
    process.exit(1);
  }

  if (!secondArg) {
    console.error("Provide the part number as the second argument.");
    process.exit(1);
  }

  const part = parseInt(secondArg);

  if (isNaN(part)) {
    console.error("The second argumet is not a valid integer.");
    process.exit(1);
  }

  if (thirdArg && thirdArg !== "real" && thirdArg !== "test") {
    console.error(
      `Invalid mode argument. Expected "real" or "test", got "${thirdArg}".`
    );
    process.exit(1);
  }

  const mode = (thirdArg as "real" | "test" | undefined) ?? "real";

  return [problem, part, mode] as const;
}

const [problem, part, mode] = parseArgs();

main(problem, part, mode);
