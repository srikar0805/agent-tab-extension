/**
 * Cost-state palette mapped to budget consumption.
 * Returned class names match tokens in tailwind.config.mjs (colors.cost.*).
 */
export type CostState = "low" | "mid" | "high" | "over" | "muted"

/** Given a 0-1 ratio of today's spend / daily cap, returns the corresponding state. */
export function costStateForRatio(ratio: number | null | undefined): CostState {
	if (ratio === null || ratio === undefined || !Number.isFinite(ratio)) return "muted"
	if (ratio >= 1) return "over"
	if (ratio >= 0.8) return "high"
	if (ratio >= 0.5) return "mid"
	return "low"
}

/** Tailwind text-color class for the state. */
export function costStateTextClass(state: CostState): string {
	switch (state) {
		case "low":
			return "text-cost-low"
		case "mid":
			return "text-cost-mid"
		case "high":
			return "text-cost-high"
		case "over":
			return "text-cost-over"
		case "muted":
		default:
			return "text-cost-muted"
	}
}

/** Tailwind background-color class for the state (used in the progress bar fill). */
export function costStateBgClass(state: CostState): string {
	switch (state) {
		case "low":
			return "bg-cost-low"
		case "mid":
			return "bg-cost-mid"
		case "high":
			return "bg-cost-high"
		case "over":
			return "bg-cost-over"
		case "muted":
		default:
			return "bg-cost-muted"
	}
}
