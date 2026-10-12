# Kodu Block Builder

Template for building simple client sites from blocks. Plain HTML, CSS and a little JS: no build step, no dependencies.

Design source: Figma, Kodu Design Lab – Website Template (page "Master Designs").

## Run locally

```bash
npx serve . -l 3200
```

Then open http://localhost:3200.

## Structure

```
index.html              page: blocks stacked in order, each marked <!-- BLOCK: name -->
css/base.css            brand tokens, reset, grid, type, buttons
css/blocks/<name>.css   one file per block
css/blocks/<style>/     blocks grouped by style, e.g. modern/
js/smooth-scroll.js     Lenis smooth scroll (loaded from jsDelivr)
js/roll.js              staggered text roll on button hover
js/reveal.js            load-in reveals as blocks scroll into view
assets/                 logo and images
```

## Blocks

| Block                     | Class                      | Source                              |
| ------------------------- | -------------------------- | ----------------------------------- |
| Header                    | `.header`                  | Grid_Container                      |
| Hero, centred             | `.hero-centred`            | Hero_Simple_Centred                 |
| Modern list               | `.modern-list`             | List_Modern                         |
| Modern tall image + text  | `.modern-tall-image-text`  | ref: studiodado.com/approach        |

Blocks that share a look are grouped by style in their own folder and named `<style>-<block>`, e.g. `modern/list.css` → `.modern-list`. That way a whole site's worth of blocks in one style can be picked up together.

## New client site

1. Copy this repo.
2. Edit the tokens in the `:root` block of `css/base.css`: colours, fonts, spacing.
3. Swap `assets/logo.svg`.
4. In `index.html`, delete the blocks you don't need and their `<link>` tags, then add the content.

## Notes

- **Fonts:** Inter Tight (headings, eyebrows, buttons) and Inter (body), loaded from Google Fonts in `index.html`. For a client, change the Google Fonts link and `--font-primary` / `--font-body`.
- **Buttons:** `.btn` is Square / 36 / Fill. Add `btn--44`, `btn--pill` and `btn--outline` to match the Figma variants.
- **Hover roll:** every `.btn` gets the staggered letter roll from kodudesignlab.com. Add `data-roll` to any other link to opt in. Speed and stagger are `--roll-dur` / `--roll-step` in `base.css`.
- **Load-ins:** add to any element in a block. CSS transitions on transform/opacity only, so they stay smooth on slow devices. Timing is `--reveal-*` / `--word-step` in `base.css`. Off for reduced motion.
  - `data-reveal`: the element fades up as it scrolls into view (e.g. each list row).
  - `data-reveal-stagger`: its children fade up one after another (e.g. the hero).
  - `data-reveal-words`: heading words slide up out of a mask.
- **Parallax:** the Modern tall image + text image drifts as it scrolls past. Pure CSS (`animation-timeline: view()`), no JS. Chrome, Edge and Safari 26+; other browsers and reduced motion get a still image.
- **Icons:** [Lucide](https://lucide.dev), pasted inline as SVG so they take the text colour.
- **Images:** the orange boxes are placeholders (`assets/placeholder.svg` in the tall block). Put an `<img>` inside any `__media` element and it fills the frame.
- **List numbers** (01, 02, …) are automatic.
- **Mobile:** nav links hide under 768px until there's a mobile menu block. The list stacks to number | title, text under the title, then a full-width image.
