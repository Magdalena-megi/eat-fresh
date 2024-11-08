// Joins multiple CSS class names, ignoring any empty or false values
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
