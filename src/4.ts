export function problem4part1(data: string) {
  const lines = data.split("\n");

  const cards = lines.map((line) => {
    const [_, card] = line.split(":");
    const [winningNumbers, numbers] = card.trim().split(" | ");
    return {
      winningNumbers: winningNumbers
        .split(/\s+/)
        .map((n) => parseInt(n.trim())),
      numbers: numbers.split(/\s+/).map((n) => parseInt(n.trim())),
    };
  });

  let total = 0;
  for (const card of cards) {
    let score = 0;
    const { winningNumbers, numbers } = card;
    const numbersSet = new Set(numbers);

    for (const winningNumber of winningNumbers) {
      if (numbersSet.has(winningNumber)) {
        if (score === 0) {
          score = 1;
        } else {
          score *= 2;
        }
      }
    }

    total += score;
  }

  return total;
}

export function problem4part2(data: string) {
  const lines = data.split("\n");

  const cards = lines.map((line) => {
    const [_, card] = line.split(":");
    const [winningNumbers, numbers] = card.trim().split(" | ");
    return {
      winningNumbers: winningNumbers
        .split(/\s+/)
        .map((n) => parseInt(n.trim())),
      numbers: numbers.split(/\s+/).map((n) => parseInt(n.trim())),
    };
  });

  const counts = new Array<number>(cards.length).fill(1);

  for (let i = 0; i < cards.length; i++) {
    const { winningNumbers, numbers } = cards[i];
    const numbersSet = new Set(numbers);

    let points = 0;
    for (const winningNumber of winningNumbers) {
      if (numbersSet.has(winningNumber)) {
        points += 1;
      }
    }

    for (let j = 0; j < points; j++) {
      counts[i + 1 + j] += counts[i];
    }
  }

  return counts.reduce((a, b) => a + b, 0);
}
