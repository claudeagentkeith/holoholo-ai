export function getAppUrl() {
  return process.env.APP_URL ?? "http://localhost:3000";
}

export function hasStripe() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function hasAnthropic() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}
