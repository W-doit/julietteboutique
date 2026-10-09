<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Keep the boutique experience on the index route, with section anchors for collection, story and visits, because this is a focused single-page website.
- Keep collection filtering client-side and send enquiries and directions to the supplied external profiles, because the site does not represent an online checkout or live inventory.
- Define visual styling in the global semantic design system, because typography, surfaces and responsive layouts must remain consistent.
- Pre-optimize first-screen UI dependencies with React and reject outdated optimized requests, because mixed dependency generations can break the React hook dispatcher during preview updates.
