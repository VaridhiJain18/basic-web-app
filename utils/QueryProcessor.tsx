export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();
  const numbers = query.match(/\d+/g);

  if (lowerQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (lowerQuery.includes("andrew id")) {
    return "My Andrew ID is varidhi";
  }

  if (lowerQuery.includes("name")) {
    return "Varidhi";
  }

  // Anagram handler
  if (lowerQuery.includes("anagram of")) {
    const match = lowerQuery.match(/anagram of (\w+)[^:]*:\s*(.+)/);
    if (match) {
      const target = match[1];
      const candidates = match[2]
        .replace(/[?\s]+$/g, "")   // trim trailing ? and whitespace
        .split(/,\s*/)
        .map((w) => w.trim().replace(/[^a-z]/g, ""));

      const sortLetters = (word: string) => word.split("").sort().join("");
      const targetSorted = sortLetters(target);

      const anagrams = candidates.filter(
        (word) => sortLetters(word) === targetSorted
      );
      return anagrams.join(", ");
    }
  }

  // Scrabble score handler
  if (lowerQuery.includes("scrabble score")) {
    const scrabbleScores: Record<string, number> = {
      a: 1, e: 1, i: 1, o: 1, u: 1,
      l: 1, n: 1, s: 1, t: 1, r: 1,
      d: 2, g: 2,
      b: 3, c: 3, m: 3, p: 3,
      f: 4, h: 4, v: 4, w: 4, y: 4,
      k: 5,
      j: 8, x: 8,
      q: 10, z: 10,
    };

    const match = lowerQuery.match(/scrabble score of (\w+)/);
    if (match) {
      const word = match[1];
      const score = word
        .split("")
        .reduce((sum, char) => sum + (scrabbleScores[char] ?? 0), 0);
      return score.toString();
    }
  }

  if (!numbers) return "";
  const nums = numbers.map(Number);

  // Largest
  if (lowerQuery.includes("largest")) {
    return Math.max(...nums).toString();
  }

  // Prime numbers
  if (lowerQuery.includes("prime")) {
    const isPrime = (n: number): boolean => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    };
    return nums.filter(isPrime).join(", ");
  }

  // Power (must check before generic arithmetic)
  if (lowerQuery.includes("to the power of")) {
    if (nums.length < 2) return "";
    return (BigInt(nums[0]) ** BigInt(nums[1])).toString();
  }

  // Generic arithmetic expression handler
  if (
    lowerQuery.includes("plus") ||
    lowerQuery.includes("minus") ||
    lowerQuery.includes("multiplied") ||
    lowerQuery.includes("divided")
  ) {
    let expression = lowerQuery;
    expression = expression.replace(/what is/g, "");
    expression = expression.replace(/multiplied by/g, "*");
    expression = expression.replace(/divided by/g, "/");
    expression = expression.replace(/plus/g, "+");
    expression = expression.replace(/minus/g, "-");
    expression = expression.replace(/[^0-9+\-*/().]/g, "");
    try {
      return eval(expression).toString();
    } catch {
      return "";
    }
  }

  return "";
}
