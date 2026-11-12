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

- Packages (exact pins to be committed in the fixture's `package.json`; latest
  registry versions observed 2026-11-12): `react` 19.3.1, `react-dom` 19.3.1,
  `zustand` 5.1.0.
- Location (planned): `examples/react-zustand-control/`, one file per fixture,
  using `create`/`createStore` and `useStore` directly, no LEO code.
- Reviewed in its own PR; sibling approach files are not edited live. Fixture
  specs above are the shared contract.

## Counting method (to be applied identically)

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

Fixtures assessed: 0 / 4. Control implemented: no. Measurements: none.
