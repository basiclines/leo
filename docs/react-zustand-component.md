# LEO + React + Zustand: Component facade (experiment #35)

Status: E0 control and E1 Model/List foundation are complete. An E2 Component
facade and all four shared jsdom fixtures are implemented on an isolated topic
branch, pending review. No reconciler is planned. React renders, Zustand holds
model and presentation state, and LEO provides model/list primitives plus this
approach's class-shaped `Component` facade.

Pinned for this slice: `react@19.3.1`, `react-dom@19.3.1`, `zustand@5.1.0`
(devDependencies only), baseline `18c81c44917cbc9acd15336b6d4ad6f86480d8c3`.

## E1: Model/List foundation

`experiments/react-zustand/component/` now contains an isolated prototype.
`Model` keeps business data in a Zustand vanilla store, exposes property access
and shallow `setState` patches, and publishes frozen top-level snapshots. It
retains the familiar `on`/`off`, `trigger`, `listenTo` and `stopListening`
event methods; `LEOObject` and `LEOList` are aliases in the experiment entry.
Nested values must be treated as immutable and replaced through `setState`.
`List` stores stable `Model` instances, changes membership with immutable arrays,
and removes or reorders items without replacing surviving models. A `List`
subclass declares its item class with `static model = Todo` so initial items are
built as that class; assigning `this.model` after `super()` only affects later
additions. Adding the same model twice keeps one change forwarder, and `move`
emits `update` like `add`, `remove` and `clear`. `useModel` and
`useList` bind selectors to React through Zustand's external-store integration.
These modules are experimental; the package's public exports and legacy engine
are unchanged. Component behavior and all four acceptance fixtures remain E2.

## Ownership rules

- Models (`LEOObject`/`Model`, `LEOList`/`List`) own business state and logic, backed by Zustand vanilla stores.
- Component-local state (`setState`) is presentation-only: open/closed, draft text, focus. Anything another view or a server needs belongs in a model.
- React composition stays available: a `Component` is a normal React function component, so hooks, context, refs, memo and children work around it.

## E2: Component facade prototype

Subclassing `Component` defines a controller-like view; wrap it with
`Component.create()` to get the actual React function component:

```jsx
class CounterModel extends Model {
  constructor() { super({ count: 0 }) }
  increment() { this.setState(s => ({ count: s.count + 1 })) }
}
class Counter extends Component {
  model = new CounterModel()
  state = { hovered: false }                // presentation only
  render() { return <button onClick={() => this.model.increment()}>{this.model.count}</button> }
}
const CounterView = Component.create(Counter)
```

Render `CounterView`, not the controller class. The wrapper subscribes to the
current model through `useSyncExternalStore`; replacing the `model` prop switches
subscriptions. Each render reads candidate props and model through an isolated
view context; the persistent controller's props and model are updated only
after commit, so a suspended render cannot redirect handlers from the previously
committed UI to an uncommitted model. `setState` shallow-merges presentation-only
state in a per-instance Zustand store. `init` and the dependency methods must be
pure because React may render more than once. `setupDependencies()` and
`layoutDependencies()` return fixed-length arrays, like React effect
dependencies; a changed dependency cleans up and re-runs its effect.

Lifecycle vocabulary, each mapped to what React really guarantees:

| Phase | React mechanism | Guarantee |
| --- | --- | --- |
| `init()` | render (pure) | May run more than once; no side effects |
| `setup()` / returns cleanup | `useEffect` | Runs after commit; Strict Mode replays it, cleanup must undo setup |
| `layout()` / returns cleanup | `useLayoutEffect` | Before paint on the client; Strict Mode replays it |
| model subscription | `useSyncExternalStore` | Disposed automatically |

There is deliberately no once-only `beforeMount` with side effects. `setup` and
`layout` run after commit and repeat on Strict Mode replay or dependency changes;
returned cleanup functions must undo setup. Normal React function components and
hooks remain available around the facade.

Questions E1-E4 must answer before any of this is claimed: snapshot identity,
selector equality, list item identity, model replacement, SSR request isolation,
explicit opt-in persistence (versioned, no methods, no sensitive data by default).

## Fixtures and control

Four fixtures share one observable DOM contract in
[`tests/fixtures/acceptance.jsx`](../tests/fixtures/acceptance.jsx):

1. counter / shared state (two views, isolated instances, Strict Mode)
2. keyed editable list (edit, reorder keeps DOM node, edits and focus/caret, remove by id)
3. async loading / error / retry / cancellation (stale result ignored, abort on id change and unmount, Strict Mode replay)
4. mount / cleanup (subscribe, Strict Mode replay leaves one subscription, fresh subscription on remount, source replacement)

An approach exports `{ counter: { create() -> { Root } }, list: { create(items) -> { Root } }, async: { Root }, lifecycle: { Root } }`
and calls `runFixtureSuite(name, impl)`. The suite only sees `data-testid`, text and input values, so thin and
component approaches can run the same file unchanged.

The Component prototype in `experiments/react-zustand/component/fixtures.jsx`
currently passes 16/16 shared tests (4/4 fixtures) in jsdom, including editable
keyed reorder, focus/caret, async abort and stale-result handling, Strict Mode
effect replay, remount cleanup and source replacement. This is acceptance-suite
evidence, not browser, SSR, concurrent-rendering, bundle-size or performance
evidence.

Control: [`experiments/react-zustand/control/index.jsx`](../experiments/react-zustand/control/index.jsx),
tested by `tests/unit/react_control_tests.jsx` (16 tests).

Control size, measured with the sibling thin doc's method (non-blank, non-comment, non-import/export lines per fixture):
counter 14, list 29, async 22, lifecycle 7.
Concepts counted: vanilla store, selector hook, `useShallow`, effect, cleanup, `AbortController`, dependency array.
Pins (shared with the thin approach, `package.json`): `react` / `react-dom` 19.3.1, `zustand` 5.1.0.
LEO/thin/component counts: pending, not yet implemented.

## Limits

- The repo's Vitest JSX transform is classic (`createElement`), so React fixture files import `createElement` explicitly.
- Render counts are not asserted: the DOM-only contract has no render hook, so this stays unmeasured until the suite defines one.
- jsdom only; the focused suspended-transition regression does not establish
  general concurrent-rendering safety. Browser, SSR and hydration checks remain
  pending (E3).
- Bundle and dependency cost not yet measured (E5).
- Not drop-in compatible with React class components: `Component` here is a sketch with different semantics.
