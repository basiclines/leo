# Thin adapter: React + Zustand (E0 design)

Experiment roadmap: #35 (independent of engine roadmap #30). Branch:
`experiment/react-zustand-thin`, baseline `18c81c44917cbc9acd15336b6d4ad6f86480d8c3`.

Status: design sketch only. No code, bundle or measurement exists yet. Anything
marked *pending* is unmeasured.

## Responsibilities

| Layer | Owner |
| --- | --- |
| Rendering, component encapsulation, effects | React (unchanged, visible to consumers) |
| Observable state container | Zustand vanilla store, one per model/list instance |
| Application state and business logic | `LEOObject` / `LEOList` (`Model` / `List` aliases) |
| Glue | One binding: `useModel(model, selector?, isEqual?)` |

Non-goals: no reconciler, no `Component` facade, no automatic persistence, no
hiding of effects or dependency arrays.

## API sketch

```js
class Counter extends Model {            // alias of LEOObject
  static initial() { return { count: 0 } }   // pure initialization, no side effects
  increment() { this.setState(s => ({ count: s.count + 1 })) }
}

const counter = new Counter()            // instance owns its own vanilla store

function View() {
  const count = useModel(counter, s => s.count)   // useSyncExternalStore inside
  return <button onClick={() => counter.increment()}>{count}</button>
}
```

Binding semantics to prove in E1 (tests first):

- Snapshot: `model.getSnapshot()` returns the same reference until state changes;
  updates are immutable shallow merges; unchanged patches do not notify.
- Selector equality: `Object.is` by default; `isEqual` is explicit and opt-in.
- Subscription: `model.subscribe(listener)` returns an unsubscribe; the binding
  disposes it on unmount and on model replacement.
- `getServerSnapshot` equals the initial state so hydration matches.
- `List`: items keep stable identity and key across reorder/edit; the list
  snapshot changes only when membership/order/an item changes.
- Instances are independent. Shared state is sharing one instance. SSR creates
  models per request, never at module scope.
- Async/lifecycle work lives in React effects with cleanup (AbortController);
  models expose actions, not a once-only `beforeMount` side-effect phase.

Compatibility gaps to document as implemented: LEO `on`/`off`/`listenTo` events
remain; `LEOElement` rendering is not part of this approach.

## Fixtures (identical across approaches and control)

Externally observable acceptance criteria. All four run in the browser and in
jsdom tests; a fixture counts as verified only when every criterion passes for
that implementation.

1. **Shared counter/state**: two views read one model. Clicking `+` in either view
   updates both to the same value; a separate model instance is unaffected;
   unrelated state changes do not re-render a view selecting only `count`.
2. **Keyed editable list**: rows with an input and a remove button. Editing row B,
   then reordering, keeps B's input value and focus; removing a row keeps
   other rows' DOM nodes.
3. **Async loading/error/cancellation**: shows `loading`, then `data` or `error`;
   a newer request supersedes an older one (older result never rendered);
   unmounting aborts the in-flight request and sets no state afterwards.
4. **Mount/cleanup**: setup runs after commit; unmount runs cleanup exactly
   once per setup. Under Strict Mode setup/cleanup pairs balance (net one active
   subscription). Remount creates a fresh subscription.

## Plain React + Zustand control

One shared control, not a second one. The control and acceptance suite are those
of the sibling Component PR #37 (head `5f8ec84d35f66a1c1615141fd17d8a14c9e1ce75`):
`experiments/react-zustand/control/index.jsx` and `tests/fixtures/acceptance.jsx`.
This approach runs that suite unchanged against its own implementation once the
file is available on this branch (copied from a reviewed state, not edited live
in the sibling branch). No `examples/react-zustand-control/` is planned here.

- Shared pins (devDependencies only): `react@19.3.1`, `react-dom@19.3.1`,
  `zustand@5.1.0`, taken from #37 `package.json` at `5f8ec84`. One side only
  changes pins: if #37 re-pins, this doc follows, so render and bundle deltas
  stay attributable to the approach, not the versions.
- Fixture criterion not yet asserted by the shared suite: fixture 1 "unrelated
  changes do not re-render a `count`-only view". Until a reviewed assertion
  exists it is *pending*, and the fixture is not counted as verified. Focus
  preserved across reorder is asserted in #37 at `5f8ec84`.

## Counting method (to be applied identically)

Shared by both approaches and the control. #37 at `5f8ec84` reports control
counts (14/29/22/7) by this method; they were reproduced independently by the
evaluator, not by this PR.

- Consumer lines: non-blank, non-comment lines in files a consumer writes
  (model + component + wiring), excluding imports and test code.
- Concepts: distinct library/React APIs or LEO terms a reader must know to
  follow that fixture (for example `useSyncExternalStore`, `setState`, selector),
  listed by name per fixture so counts can be audited.
- Bundle cost: production build size, minified and gzipped, of fixture entry
  with React/ReactDOM counted separately. *Pending.*
- Render counts: React Profiler/test counters per fixture. *Pending.*

## Roadmap mapping

| Step | Content | State |
| --- | --- | --- |
| E0 | This sketch, fixtures, control definition | this PR |
| E1 | Models/List + binding with tests | pending |
| E2 | All four fixtures on the thin approach | pending |
| E3 | Strict Mode, replacement, races, SSR/hydration | pending |
| E4 | Opt-in persistence (storage adapter, versioned, errors explicit) | pending |
| E5 | Source-linked comparison with losses | pending |

Fixtures assessed: 0 / 4. Control: shared with #37 (not on this branch). Measurements: none.
