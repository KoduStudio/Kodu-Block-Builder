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
js/smooth-scroll.js     Lenis smooth scroll (loaded from jsDelivr)
js/roll.js              staggered text roll on button hover
assets/                 logo and images
```

## Blocks

| Block          | Class           | Figma frame         |
| -------------- | --------------- | ------------------- |
| Header         | `.header`       | Grid_Container      |
| Hero, centred  | `.hero-centred` | Hero_Simple_Centred |
| List, modern   | `.list-modern`  | List_Modern         |

New layouts of the same block get their own name and file, e.g. `faq-accordion.css`, `faq-split.css`.

## New client site

1. Copy this repo.
2. Edit the tokens in the `:root` block of `css/base.css`: colours, fonts, spacing.
3. Swap `assets/logo.svg`.
4. In `index.html`, delete the blocks you don't need and their `<link>` tags, then add the content.

## Notes

- **Fonts:** Inter Tight (headings, eyebrows, buttons) and Inter (body), loaded from Google Fonts in `index.html`. For a client, change the Google Fonts link and `--font-primary` / `--font-body`.
- **Buttons:** `.btn` is Square / 36 / Fill. Add `btn--44`, `btn--pill` and `btn--outline` to match the Figma variants.
- **Hover roll:** every `.btn` gets the staggered letter roll from kodudesignlab.com. Add `data-roll` to any other link to opt in. Speed and stagger are `--roll-dur` / `--roll-step` in `base.css`.
- **List images:** the orange box is a placeholder. Put an `<img>` inside `.list-modern__media` and it fills the frame.
- **List numbers** (01, 02, …) are automatic.
- **Mobile:** nav links hide under 768px until there's a mobile menu block.
