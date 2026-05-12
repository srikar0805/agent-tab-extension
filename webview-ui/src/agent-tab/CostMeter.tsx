import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"
import { formatCost, formatTokens } from "./lib/format"
import { costStateBgClass, costStateForRatio, costStateTextClass } from "./theme/costState"

export interface CostMeterProps {
	sessionCostUsd: number
	sessionTokens: number
	todayCostUsd?: number | null
	dailyCapUsd?: number | null
	modelName?: string | null
}

/**
 * Sticky cost-aware strip rendered above the chat. Shows session cost (bold,
 * animated count-up), today total against an optional cap (progress bar that
 * color-shifts as the cap fills up), and the active model name.
 */
export function CostMeter({ sessionCostUsd, sessionTokens, todayCostUsd, dailyCapUsd, modelName }: CostMeterProps) {
	const ratio =
		dailyCapUsd && dailyCapUsd > 0 && todayCostUsd !== null && todayCostUsd !== undefined
			? Math.max(0, todayCostUsd / dailyCapUsd)
			: null
	const state = costStateForRatio(ratio)

	return (
		<div className="sticky top-0 z-20 border-b border-border-panel bg-background/85 px-3 py-2 backdrop-blur-md">
			<div className="flex items-baseline justify-between gap-3">
				<div className="flex items-baseline gap-3">
					<AnimatedCost label="session" usd={sessionCostUsd} />
					{todayCostUsd !== null && todayCostUsd !== undefined ? (
						<AnimatedCost label="today" muted usd={todayCostUsd} />
					) : null}
					<span className="font-azeret-mono text-xxs text-cost-muted tabular-nums">
						{formatTokens(sessionTokens)} tok
					</span>
				</div>
				<div className="font-azeret-mono text-xxs text-cost-muted truncate max-w-[40%]" title={modelName ?? undefined}>
					{modelName ?? "no model"}
				</div>
			</div>
			{ratio !== null ? (
				<div className="mt-1.5 flex items-center gap-2">
					<div className="relative h-1 flex-1 overflow-hidden rounded-full bg-muted">
						<motion.div
							animate={{ width: `${Math.min(100, ratio * 100)}%` }}
							className={`absolute inset-y-0 left-0 ${costStateBgClass(state)}`}
							initial={{ width: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
						/>
					</div>
					<span className={`font-azeret-mono text-xxs tabular-nums ${costStateTextClass(state)}`}>
						{formatCost(todayCostUsd ?? 0)} / {formatCost(dailyCapUsd ?? 0)}
					</span>
				</div>
			) : null}
			<AnimatePresence>
				{state === "over" ? (
					<motion.div
						animate={{ opacity: 1, height: "auto" }}
						className="mt-1 text-xxs text-cost-over"
						exit={{ opacity: 0, height: 0 }}
						initial={{ opacity: 0, height: 0 }}>
						daily cap exceeded — new requests will be blocked unless overridden
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}

function AnimatedCost({ label, usd, muted = false }: { label: string; usd: number; muted?: boolean }) {
	const mv = useMotionValue(usd)
	useEffect(() => {
		const controls = animate(mv, usd, { duration: 0.4, ease: "easeOut" })
		return () => controls.stop()
	}, [usd, mv])
	const display = useTransform(mv, (v) => formatCost(v))
	return (
		<div className="flex items-baseline gap-1">
			<span className="font-azeret-mono text-xxs uppercase tracking-wider text-cost-muted">{label}</span>
			<motion.span
				className={`font-azeret-mono text-sm tabular-nums ${muted ? "text-foreground/70" : "font-semibold text-foreground"}`}>
				{display}
			</motion.span>
		</div>
	)
}
