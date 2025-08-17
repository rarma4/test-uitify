export function simulateLatency(ms = 700) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
