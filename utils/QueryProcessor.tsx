export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Rohan";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "My Andrew ID is varidhi";
  }  

  if (query.toLowerCase().includes("largest")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const max = Math.max(...numbers.map(Number));
      return max.toString();
    }
  }

  if (query.toLowerCase().includes("plus")) {
    const numbers = query.match(/\d+/g);
    if (!numbers || numbers.length < 2) {
      return "";
    }
    const sum = numbers.map(Number).reduce((a, b) => a + b, 0);
    return sum.toString();
  }
    

  
  return "";
}
