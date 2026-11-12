# LEO + React + Zustand: Component facade (experiment #35, slice E0)

Status: E0 only (API sketch, fixture contract, pinned plain React + Zustand control).
Nothing here is implemented for LEO yet; no reconciler is planned. React renders,
Zustand holds state, LEO supplies model/list vocabulary and (this approach) a
`Component` facade.

Pinned for this slice: `react@19.2.0`, `react-dom@19.2.0`, `zustand@5.0.8`
(devDependencies only), baseline `18c81c44917cbc9acd15336b6d4ad6f86480d8c3`.

## Ownership rules

- Models (`LEOObject`/`Model`, `LEOList`/`List`) own business state and logic, backed by Zustand vanilla stores.
- Component-local state (`setState`) is presentation-only: open/closed, draft text, focus. Anything another view or a server needs belongs in a model.
- React composition stays available: a `Component` is a normal React function component, so hooks, context, refs, memo and children work around it.

## Sketch: Component facade (not implemented)

```jsx
class Counter extends Component {
  model = Model({ count: 0, increment() { this.setState(s => ({ count: s.count + 1 })) } })
  state = { hovered: false }                // presentation only
  render() { return <button onClick={this.model.increment}>{this.model.count}</button> }
}
```

Lifecycle vocabulary, each mapped to what React really guarantees:

| Phase | React mechanism | Guarantee |
| --- | --- | --- |
| `init()` | render (pure) | May run more than once; no side effects |
| `setup()` / returns cleanup | `useEffect` | Replayed by Strict Mode; cleanup must undo setup |
| `layout()` / returns cleanup | `useLayoutEffect` | Before paint, client only |
| model subscription | `useSyncExternalStore` | Disposed automatically |

There is deliberately no once-only `beforeMount` with side effects. Async work gets
an `AbortSignal` that aborts on cleanup or dependency change.

Questions E1-E4 must answer before any of this is claimed: snapshot identity,
selector equality, list item identity, model replacement, SSR request isolation,
explicit opt-in persistence (versioned, no methods, no sensitive data by default).

## Fixtures and control

Four fixtures share one observable DOM contract in
[`tests/fixtures/acceptance.jsx`](../tests/fixtures/acceptance.jsx):

1. counter / shared state (two views, isolated instances, Strict Mode)
2. keyed editable list (edit, reorder keeps DOM node and edits, remove by id)
3. async loading / error / retry / cancellation (stale result ignored, abort on id change and unmount)
4. mount / cleanup (subscribe, Strict Mode replay leaves one subscription, source replacement)

An approach exports `{ counter: { create() -> { Root } }, list: { create(items) -> { Root } }, async: { Root }, lifecycle: { Root } }`
and calls `runFixtureSuite(name, impl)`. The suite only sees `data-testid`, text and input values, so thin and
component approaches can run the same file unchanged.

Control: [`experiments/react-zustand/control/index.jsx`](../experiments/react-zustand/control/index.jsx),
tested by `tests/unit/react_control_tests.jsx` (13 tests).

Control size, measured as physical lines including blanks and comments:
counter 15, list 31, async 24, lifecycle 9 (90 file total including imports).
Concepts counted: vanilla store, selector hook, `useShallow`, effect, cleanup, `AbortController`, dependency array.
LEO/thin/component counts: pending, not yet implemented.

## Limits

- The repo's Vitest JSX transform is classic (`createElement`), so React fixture files import `createElement` explicitly.
- jsdom only; no browser, SSR or concurrent-rendering evidence yet (E3).
- Bundle and dependency cost not yet measured (E5).
- Not drop-in compatible with React class components: `Component` here is a sketch with different semantics.
