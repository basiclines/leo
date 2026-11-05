# A credible alternative to React

LEO's goal is familiar component authoring with clearer ownership: Objects and
Lists own data and actions; Elements connect models to views. Keeping these
primitives and their existing methods is a constraint, not a reason to reproduce
all of React's internals or vocabulary.

## What developers report

Sources checked November 5, 2026:

| Evidence | What it supports | LEO's response |
| --- | --- | --- |
| [State of JS 2024: front-end framework pain points](https://2024.stateofjs.com/en-US/libraries/front-end-frameworks/) names complexity, performance, choice overload, breaking changes and state management. | These are recurring concerns among survey respondents. The freeform categories overlap and cover frameworks generally; they are not React-specific failure rates or a representative census. | Keep three primitives, preserve existing entry points, document differences, measure runtime behavior. |
| [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) explains redundant derived state, extra render passes and event logic misplaced in Effects. | Some common complexity comes from how data flow is expressed, not just syntax. React also provides guidance to avoid it. | Derived values are model getters; user actions are model methods; the view renders those values. |
| [React: useEffect](https://react.dev/reference/react/useEffect) documents dependency rules, cleanup, repeated execution and infinite-cycle troubleshooting. | Synchronization has real lifecycle obligations. Removing a dependency array does not remove the need for cleanup or cancellation. | Automatic model subscription cleanup; explicit `mount`/`dismount` for external resources. No new hook-like concept. |
| [React: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) explains render-time snapshots and event handlers. | React's snapshot semantics are intentional. A different API must explain its different timing rather than claim React is broken. | `model.setState(previous => patch)` reads current model state synchronously. Closures over copied values can still become stale. |

These sources justify hypotheses, not a conclusion that LEO is easier or faster.
No interviews or representative migration study have been performed. Follow-up
research should include developers who prefer React and developers who left it,
including accessibility, debugging, forms and ecosystem requirements.

## First implemented foundation

The renderer patches compatible DOM nodes, matches stable sibling keys and
updates text, attributes, controlled values and event listeners. String-returning
components and legacy lifecycle methods remain supported. Classic JSX supports
function components, props and children without a React runtime.

`LEOObject.setState` supports shallow patches and current-state updater functions.
Changes notify connected Elements without moving state ownership into the view.
A multi-field patch commits before notification and renders each observing
Element once. Direct property assignment stays synchronous.

The examples separate model modules from component modules. One shares a model
between two views; the other derives filtering in a model and preserves keyed
input identity while reordering.

## Migration target, not a compatibility percentage

To establish the 80% target, first choose a retained corpus of real, licensed React
components representing forms, lists, composition and shared application state.
Record each original component, required source edits and unsupported behaviors.
The denominator should be all eligible components in that corpus, including
failed migrations, not just successful demos. Define "no major rewrite" before
scoring: preserve the render structure, props contract and user-visible behavior;
moving state/actions into a model is the deliberate architectural change.

Initial capability checklist:

| React-facing surface | Current LEO behavior | Remaining gap |
| --- | --- | --- |
| JSX DOM markup | Classic `createElement` transform, className/htmlFor, text, arrays, conditionals | No automatic JSX runtime or exhaustive DOM prop compatibility |
| Function components | Props and children; ordinary pure view functions | No hook runtime, memo or React component package compatibility |
| Component state | Model-owned `setState(patch/updater)` | Intentional migration from useState/class-local state; no concurrent scheduler |
| Composition | Functions, fragments and custom elements | Keyed multi-root groups and general custom-element object-prop/slot contracts |
| Lists and identity | Array-returning LEOList.map, stable sibling keys, node reuse | No measured large-list rendering or virtualization target yet |
| DOM events | Native handlers and capture suffix | React synthetic events and onChange semantics differ |
| Lifecycle | beforeMount/mount/dismount and owned subscription cleanup | Custom-element moves may invoke disconnect/reconnect; resource cancellation remains explicit |
| Forms and refs | Controlled value/checked/selected, defaultValue, callback refs | Complex selection, hydration and third-party widget integration need broader coverage |
| Production tooling | Existing UMD build, reproducible tests, CI | Types, modern ESM exports, developer tooling and ecosystem adapters |
| Server rendering and resilience | Not provided | SSR/hydration, async/error boundaries, concurrent rendering and accessibility validation |

## Next milestones and acceptance evidence

1. **Renderer confidence.** Add real-browser coverage for keyed insertion/deletion,
   focused selection, select/textarea, SVG, nested custom elements and disconnect/
   reconnect. Compare string and JSX rendering against the original replace-all
   renderer and a pinned React build for the same 1,000-row tasks. Record browser,
   device, production bundle sizes, warm-up, sample count, median and p95.
   Count DOM operations separately from elapsed time. Missing measurements stay
   unknown; no "faster than React" claim until reproducible results exist.
2. **Migration evidence.** Establish the corpus above, publish component-by-component
   outcomes, and address common render-level rewrites before expanding the API.
   The success target is at least 80% of eligible components meeting the agreed
   migration definition, without losing keyboard behavior or accessible names.
3. **Usable model operations.** Extend observable List operations and document
   loading/error/cancellation patterns with real examples. Decide batching from
   measured repeated-update costs, not a new abstraction's appeal. Preserve the
   synchronous contract unless an explicit opt-in or reviewed version change is made.
4. **Packaging and release readiness.** Modern ESM/types, real browser CI, explicit
   compatibility policy, accessibility examples and release notes before claiming
   production readiness. Fixes must retain the model/view split and avoid adding
   dependencies merely to imitate React.

For each milestone, retain failures as well as successes. Revisit pending
measurements at the next milestone; passing unit tests or generating more PRs is
not evidence of developer satisfaction or application performance. The owner
supervises direction and any breaking API or published release decisions.
