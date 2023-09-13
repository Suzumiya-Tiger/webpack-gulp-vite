export function sum(num1: number, num2: number): number {
  return num1 + num2;
}

export function formatPrice(priceString: string) {
  if (priceString.includes("$")) {
    return "xxx";
  } else {
    return "yyy";
  }
}
