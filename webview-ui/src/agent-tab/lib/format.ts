export function formatCost(usd: number | null | undefined): string {
	if (usd === null || usd === undefined || !Number.isFinite(usd)) return "—"
	if (usd === 0) return "$0.00"
	if (usd < 0.01) return `$${usd.toFixed(4)}`
	return `$${usd.toFixed(2)}`
}

export function formatTokens(n: number | null | undefined): string {
	if (n === null || n === undefined || !Number.isFinite(n)) return "—"
	if (n < 1_000) return String(Math.round(n))
	if (n < 1_000_000) return `${(n / 1_000).toFixed(1)}k`
	return `${(n / 1_000_000).toFixed(2)}M`
}

export function formatPercent(p: number | null | undefined): string {
	if (p === null || p === undefined || !Number.isFinite(p)) return "—"
	return `${Math.round(p * 100)}%`
}
