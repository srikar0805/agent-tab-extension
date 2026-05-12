import type { ReactNode } from "react"
import { useExtensionState } from "../context/ExtensionStateContext"
import { CostMeter } from "./CostMeter"

interface AppShellProps {
	children: ReactNode
}

/**
 * Top-level Agent Tab shell. Renders the sticky cost meter above the existing
 * chat surface. Existing settings/history/MCP overlays still render through
 * App.tsx and float above the chat as usual.
 */
export function AppShell({ children }: AppShellProps) {
	const { currentTaskItem, apiConfiguration, agentTabSettings } = useExtensionState() as {
		currentTaskItem?: {
			totalCost?: number
			tokensIn?: number
			tokensOut?: number
			cacheWrites?: number
			cacheReads?: number
		}
		apiConfiguration?: { apiModelId?: string }
		agentTabSettings?: { dailyCapUsd?: number; todayCostUsd?: number }
	}

	const sessionCostUsd = currentTaskItem?.totalCost ?? 0
	const sessionTokens =
		(currentTaskItem?.tokensIn ?? 0) +
		(currentTaskItem?.tokensOut ?? 0) +
		(currentTaskItem?.cacheReads ?? 0) +
		(currentTaskItem?.cacheWrites ?? 0)
	const modelName = apiConfiguration?.apiModelId ?? null
	const dailyCapUsd = agentTabSettings?.dailyCapUsd ?? null
	const todayCostUsd = agentTabSettings?.todayCostUsd ?? null

	return (
		<div className="flex h-screen w-full flex-col">
			<CostMeter
				dailyCapUsd={dailyCapUsd}
				modelName={modelName}
				sessionCostUsd={sessionCostUsd}
				sessionTokens={sessionTokens}
				todayCostUsd={todayCostUsd}
			/>
			<div className="flex flex-1 min-h-0 flex-col">{children}</div>
		</div>
	)
}
