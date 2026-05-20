const defaultLocale = "en-US"

export function formatCurrency(
  value: number,
  currency = "USD",
  locale = defaultLocale
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number, locale = defaultLocale) {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatPercent(value: number, locale = defaultLocale) {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  }).format(value / 100)
}

export function formatDate(
  value: string | Date,
  locale = defaultLocale,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
) {
  const date = typeof value === "string" ? new Date(value) : value
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export function formatRelativeDate(value: string, locale = defaultLocale) {
  const date = new Date(value)
  const now = new Date()
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(value, locale, { month: "short", day: "numeric" })
}
