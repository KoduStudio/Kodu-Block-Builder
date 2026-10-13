# Kodu Block Builder

Template for building simple client sites from blocks. Plain HTML, CSS and a little JS: no build step, no dependencies.

Design source: Figma, Kodu Design Lab – Website Template (page "Master Designs").

## Run locally

```bash
npx serve . -l 3200
```

Then open http://localhost:3200.

The scripts are ES modules (`<script type="module">`), so each file keeps its own scope. Modules need a server: open the site through `npx serve` (or Vercel), not by double-clicking the HTML file.

## Structure

```
index.html              home: a full example page (hero, marquee, services, icon list, image + text, steps, list, FAQ, CTA)
heroes.html             block library: hero variants
lists.html              block library: lists, icon list, steps, FAQs
image-text.html         block library: image + text blocks
cards.html              block library: cards
ctas.html               block library: calls to action
                        (each block marked <!-- BLOCK: name --> so it can be copied out)
css/base.css            brand tokens, reset, grid, type, buttons
css/blocks/<name>.css   one file per block
css/blocks/<style>/     blocks grouped by style, e.g. modern/
js/smooth-scroll.js     Lenis smooth scroll (loaded from jsDelivr)
js/roll.js              staggered text roll on button hover
js/reveal.js            load-in reveals as blocks scroll into view
js/parallax.js          parallax fallback for browsers without CSS scroll timelines (Firefox)
js/dots.js              interactive dot field for any section with data-dots
js/marquee.js           endless marquee: fills any screen width, seamless loop
js/menu.js              mobile menu open/close (header)
js/header.js            header hides on scroll down, slides back on scroll up
js/faq.js               smooth FAQ accordion in every browser
assets/favicon.png      browser tab icon (192px, made from assets/BlockBuilder_thumbnail.png)
assets/images/          web-sized photos (originals in placeholder-images/, not committed)
```

## Pages

The nav links to one page per block type, so the library stays easy to browse as it grows. New block types get their own page and nav link. Pages are plain HTML: the header is copied into each one, so nav changes go in every page. Each page only loads the CSS and JS its blocks need.

## Blocks

| Block                     | Class                      | Source                              |
| ------------------------- | -------------------------- | ----------------------------------- |
| Header                    | `.header`                  | Grid_Container                      |
| Mobile menu (header)      | `.menu`                    | ref: studiodado.com                 |
| Hero, centred             | `.hero-centred`            | Hero_Simple_Centred (+ Image w. Dots) |
| Hero, full image + CTA card | `.hero-full-image`     | Hero Full Image w. CTA Card         |
| Marquee info bar          | `.marquee`                 | Marquee Info Bar                    |
| Services bento            | `.services-bento`          | from the Tarlo site                 |
| Icon list, simple         | `.icon-list`               | Icon Simple List                    |
| Steps, tall image         | `.steps-tall-image`        | Step by Step tall image             |
| FAQ, split                | `.faq-split`               | ref: marketer.com                   |
| CTA, centred frame        | `.cta-centred-frame`       | Centred Frame CTA                   |
| Modern list               | `.modern-list`             | List_Modern                         |
| Modern tall image + text  | `.modern-tall-image-text`  | ref: studiodado.com/approach        |

Blocks that share a look are grouped by style in their own folder and named `<style>-<block>`, e.g. `modern/list.css` → `.modern-list`. That way a whole site's worth of blocks in one style can be picked up together.

### Hero options

The centred hero is one block with optional extras. Add or delete them as needed:

- **Dots:** `data-dots` on the `<section>`. The interactive dot field turns on and the hero slides up behind the header. Remove the attribute to turn it off.
- **Photo circles:** the `<ul class="hero-centred__faces">`. Images are 240px squares.
- **Eyebrow:** the `<p class="eyebrow hero-centred__eyebrow">`.

If a marquee comes straight after the hero, they fill the first screen together.

### Hero, full image + CTA card

Full-screen photo (`.hero-full-image__bg`) under a 40% overlay (`--overlay-hero`), heading/text/buttons bottom left. The glass CTA card is optional: delete `.hero-full-image__card` to drop it. As the first block on a page it runs up behind the header, which switches to light text automatically and back to dark when it slides in on scroll. On mobile the content centres and the card runs along the bottom (image left, text right).

## New client site

1. Copy this repo.
2. Edit the tokens in the `:root` block of `css/base.css`: colours, fonts, spacing. Greys come from the Neutral 50–900 scale (Figma); text and background colours point at it, so a client's greys are changed in one place.
3. Swap `assets/logo.svg`.
4. Build each page from blocks copied out of the library pages, keeping the `<link>`/`<script>` tags they need, then add the content.

## Notes

- **Fonts:** Inter Tight (headings, eyebrows, buttons) and Inter (body), loaded from Google Fonts in `index.html`. For a client, change the Google Fonts link and `--font-primary` / `--font-body`.
- **Text buttons:** `.text-btn` is a label-only button (no box) that hugs its text at min 38px tall with a 44px tap area. Used for the mobile Menu / Close.
- **Buttons:** `.btn` is Square / 36 / Fill. Add `btn--44`, `btn--pill`, `btn--outline` or `btn--light` (light fill, dark text, for dark backgrounds) to match the Figma variants. For an icon, put an inline SVG after the label (`<a class="btn">Label <svg…></a>`); it nudges right on hover and the label still rolls.
- **Two-tone headings:** `.heading-48` with the second line in a `<span>` (CTA, icon list).
- **Icon list:** built for 4 items but any number shares the row; 2 x 2 on tablet, stacked on mobile.
- **CTA gradient:** mixed from `--brand` with `color-mix()`, so it follows the client colour.
- **CTA background image (option):** add `<img class="cta-centred-frame__bg">` as the panel's first child. The photo covers the gradient under `--overlay` and the text switches to `--text-on-image`. Add `data-parallax` to the panel for the drift. Remove the `<img>` to go back to the gradient.
- **Hover roll:** every `.btn` gets the staggered letter roll from kodudesignlab.com. Add `data-roll` to any other link to opt in. Speed and stagger are `--roll-dur` / `--roll-step` in `base.css`.
- **Load-ins:** add to any element in a block. One-shot CSS animations on transform/opacity only, so they stay smooth on slow devices and never override hover effects. Timing is `--reveal-*` / `--word-step` in `base.css`. Off for reduced motion.
  - `data-reveal`: the element fades up as it scrolls into view (e.g. each list row).
  - `data-reveal-stagger`: its children fade up one after another (e.g. the hero).
  - `data-reveal-words`: heading words slide up out of a mask.
- **Parallax:** add `data-parallax` to any `__media` frame and its image drifts as it scrolls past. CSS scroll-driven animation in Chrome, Edge, Arc and Safari 26+ (no JS); `js/parallax.js` covers Firefox. Off for reduced motion. Frames use `overflow: clip` — `hidden` would break the CSS version.
- **Icons:** [Lucide](https://lucide.dev), pasted inline as SVG so they take the text colour.
- **Images:** put an `<img>` in a block's `__media` frame and it fills it. Export at about 2x the size it shows (list ~800px wide, tall block ~1000px) and keep each under ~300KB.
- **Modern tall image + text, image left (option):** add `modern-tall-image-text--image-left` to the section to flip it. Mobile stacks the same either way.
- **Modern list image shape:** portrait by default; add `modern-list__media--landscape` for 3:2.
- **Dot field:** `data-dots` works on any section. Dot colour is `--dot`; spacing and glow size are `--dot-gap` / `--dot-r`. Only animates while the mouse moves.
- **Marquee:** write one group of items; `js/marquee.js` adds as many copies as the screen needs and loops by exactly one group, so it never gaps on wide screens. Speed is `MARQUEE_SPEED` in the script. Pauses on hover; still for reduced motion.
- **Services bento:** cards 1–7 follow the bento layout; extra cards fall into rows of three. Above 1380px the grid is inset to page columns 2–11; at 1380px and below it is full width. Icons are Lucide, inline.
- **Steps:** automatic 01, 02… numbers; any number of steps. Mobile order: heading, image, steps.
- **FAQ:** native `<details>`; `js/faq.js` animates open/close smoothly in every browser (incl. iPhone) and keeps one open at a time per `name`. Drop `name` to allow several; add `open` to start one expanded. Without JS the native accordion still works.
- **List numbers** (01, 02, …) are automatic.
- **Header on scroll:** scrolls away as you go down and slides back down as soon as you scroll up. The blurred backdrop only comes in once you are a screen height down (`SOLID_FROM` in `js/header.js`), so it never sits as a white blur over the hero; over the full-image hero it keeps its light text until then. It stays in the page flow (`position: sticky`), so nothing jumps.
- **Mobile menu:** under 768px the header shows the logo (140px) and a Menu button that opens a full-screen `<dialog>` (Esc, Close or tapping a link closes it; page scroll pauses). Its links and contact details live in the dialog right after `</header>` on each page.
- **Mobile:** The list stacks to number | title, text under the title, then a full-width image.
