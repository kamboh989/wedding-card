export function normalizePhone(input: string) {
  let x = input.trim().replace(/[^\d+]/g, "");
  if (x.startsWith("+92")) x = "0" + x.slice(3);
  else if (x.startsWith("92")) x = "0" + x.slice(2);
  return x;
}
