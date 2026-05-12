# Agent Tab — cost-aware AI coding for VS Code

> An autonomous AI coding agent that puts the bill on the screen. Live per-turn cost, pre-flight estimates before each request, daily budget caps, and model-by-model price comparison — so you actually know what each turn costs.

Forked from [Cline](https://github.com/cline/cline) (Apache 2.0), with a cost-aware UX layered on top.

---

## Why

Most AI coding tools obscure cost:

- **Cursor** wraps usage in a subscription, you have no idea what each request costs.
- **Cline** shows running totals after the fact but doesn't help you avoid expensive turns.
- **Claude Code** doesn't surface cost in-product at all.
- **GitHub Copilot** is flat-rate and opaque.

As agents get more autonomous (longer tool loops, larger contexts), cost variance per task gets wider. Agent Tab makes cost a first-class design constraint instead of an afterthought.

## The four cost features

1. **Live per-turn cost meter** — every assistant message shows its own cost the moment it streams in, plus running session and today totals. No clicking around to find out what a turn cost.
2. **Pre-flight cost estimate** — before sending a request, see "this turn will cost about $X based on context size + model". Sometimes that one number alone changes the prompt you write.
3. **Daily / weekly budget caps** — soft cap shows a warning at 80%; hard cap blocks the next call. Configurable per workspace.
4. **Model picker with cost comparison** — when choosing a model, see `$/1k input + $/1k output` side by side. Pick the right model for the task instead of always defaulting to the expensive one.

Pricing comes from [models.dev](https://models.dev) (community-maintained, refreshed automatically), with an offline fallback bundle so the extension works without a network round-trip.

## Status

**Pre-alpha.** The rebrand and the four features are in active development. Track progress in [CHANGELOG.md](./CHANGELOG.md) and the GitHub issues.

If you want the existing Cline functionality (which underpins this extension) without the cost-aware layer, install the upstream extension directly: https://github.com/cline/cline.

## Development

Prereqs: Node 20+, VS Code 1.84+.

```bash
git clone https://github.com/srikar0805/agent-tab-extension.git
cd agent-tab-extension
npm install
npm run protos        # generate protobuf bindings
npm run compile       # build extension + webview
```

Then open the folder in VS Code and press **F5** to launch an Extension Development Host.

## Relationship to Cline

Agent Tab is a downstream fork. We track upstream regularly and merge in their bug fixes and provider additions. Our changes are limited to the cost-aware UX layer: the chat UI, the API request lifecycle, the settings, and a small number of new components. We don't fork Cline's tool layer, agent loop, or provider abstraction — those stay close to upstream so we don't carry maintenance burden for things we don't change.

Big thanks to the Cline team for building a clean, well-architected foundation.

## License

Apache 2.0 — same as upstream Cline. See [LICENSE](./LICENSE) and [NOTICE](./NOTICE).
