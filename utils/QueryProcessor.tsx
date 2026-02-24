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
    // Extract the target word and candidates
    // Query format: "which of the following is an anagram of X: a, b, c?"
    const match = lowerQuery.match(/anagram of (\w+)[^:]*:\s*(.+)/);
    if (match) {
      const target = match[1];
      const candidates = match[2]
        .replace(/[?]/g, "")
        .split(/,\s*/)
        .map((w) => w.trim());

      const sortLetters = (word: string) => word.split("").sort().join("");
      const targetSorted = sortLetters(target);

      const anagrams = candidates.filter(
        (word) => sortLetters(word) === targetSorted
      );
      return anagrams.join(", ");
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

  // Generic arithmetic expression handler (handles plus, minus, multiplied, divided)
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
