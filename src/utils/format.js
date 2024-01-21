export function numberWithDots(num) {
  if (!num) return
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
