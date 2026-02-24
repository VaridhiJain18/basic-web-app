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

  if (lowerQuery.includes("name")) {
    return "Varidhi";
  }

  if (lowerQuery.includes("andrew id")) {
    return "My Andrew ID is varidhi";
  }

  if (!numbers) return "";

  const nums = numbers.map(Number);

  // Largest
  if (lowerQuery.includes("largest")) {
    return Math.max(...nums).toString();
  }

  // Addition
  if (lowerQuery.includes("plus")) {
    return nums.reduce((a, b) => a + b, 0).toString();
  }

  // Prime numbers
if (lowerQuery.includes("prime")) {
  if (!nums) return "";

  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const primes = nums.filter(isPrime);
  return primes.join(", ");
}

  // Subtraction
  if (lowerQuery.includes("minus")) {
    return (nums[0] - nums[1]).toString();
  }

  // Multiplication
  if (lowerQuery.includes("multiplied")) {
    return (nums[0] * nums[1]).toString();
  }

  // Power
if (lowerQuery.includes("to the power of")) {
  if (nums.length < 2) return "";
  return Math.pow(nums[0], nums[1]).toString();
}
  // Division
  if (lowerQuery.includes("divided")) {
    if (nums[1] === 0) return "undefined";
    return (nums[0] / nums[1]).toString();
  }

  return "";
}
