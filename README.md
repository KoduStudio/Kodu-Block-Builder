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
js/parallax.js          parallax fallback for browsers without CSS scroll timelines (Firefox)
js/dots.js              interactive dot field for any section with data-dots
js/marquee.js           endless marquee: fills any screen width, seamless loop
assets/images/          web-sized photos (originals in placeholder-images/, not committed)
```

## Blocks

| Block                     | Class                      | Source                              |
| ------------------------- | -------------------------- | ----------------------------------- |
| Header                    | `.header`                  | Grid_Container                      |
| Hero, centred             | `.hero-centred`            | Hero_Simple_Centred (+ Image w. Dots) |
| Marquee info bar          | `.marquee`                 | Marquee Info Bar                    |
| Services bento            | `.services-bento`          | from the Tarlo site                 |
| Modern list               | `.modern-list`             | List_Modern                         |
| Modern tall image + text  | `.modern-tall-image-text`  | ref: studiodado.com/approach        |

Blocks that share a look are grouped by style in their own folder and named `<style>-<block>`, e.g. `modern/list.css` → `.modern-list`. That way a whole site's worth of blocks in one style can be picked up together.

### Hero options

The centred hero is one block with optional extras. Add or delete them as needed:

- **Dots:** `data-dots` on the `<section>`. The interactive dot field turns on and the hero slides up behind the header. Remove the attribute to turn it off.
- **Photo circles:** the `<ul class="hero-centred__faces">`. Images are 240px squares.
- **Eyebrow:** the `<p class="eyebrow hero-centred__eyebrow">`.

If a marquee comes straight after the hero, they fill the first screen together.

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
- **Parallax:** add `data-parallax` to any `__media` frame and its image drifts as it scrolls past. CSS scroll-driven animation in Chrome, Edge, Arc and Safari 26+ (no JS); `js/parallax.js` covers Firefox. Off for reduced motion. Frames use `overflow: clip` — `hidden` would break the CSS version.
- **Icons:** [Lucide](https://lucide.dev), pasted inline as SVG so they take the text colour.
- **Images:** put an `<img>` in a block's `__media` frame and it fills it. Export at about 2x the size it shows (list ~800px wide, tall block ~1000px) and keep each under ~300KB.
- **Modern list image shape:** portrait by default; add `modern-list__media--landscape` for 3:2.
- **Dot field:** `data-dots` works on any section. Dot colour is `--dot`; spacing and glow size are `--dot-gap` / `--dot-r`. Only animates while the mouse moves.
- **Marquee:** write one group of items; `js/marquee.js` adds as many copies as the screen needs and loops by exactly one group, so it never gaps on wide screens. Speed is `MARQUEE_SPEED` in the script. Pauses on hover; still for reduced motion.
- **Services bento:** cards 1–7 follow the bento layout; extra cards fall into rows of three. Icons are Lucide, inline.
- **List numbers** (01, 02, …) are automatic.
- **Mobile:** nav links hide under 768px until there's a mobile menu block. The list stacks to number | title, text under the title, then a full-width image.
