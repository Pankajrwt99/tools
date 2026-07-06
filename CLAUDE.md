# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## Repository purpose

This repo is a small collection of standalone, single-file web tools (e.g. image
compression, and future utilities of the same kind). There is no build system,
package manager, backend, or test suite — each tool is a self-contained static
HTML page that runs entirely client-side in the browser.

## Structure

- `README.md` — minimal repo description.
- `*.html` — one file per tool. Each file is fully self-contained: markup, CSS
  (in a `<style>` block), and JavaScript (in a `<script>` block) all live in the
  same file. There are no shared assets, includes, or bundlers.
- `img-compress.html` — client-side image compression tool. Lets a user drag/drop
  or browse an image, choose a quality level and output format (JPEG/PNG/WebP),
  and compresses it using the HTML5 `<canvas>` API (`canvas.toDataURL`). All
  processing happens in the browser; no image is ever uploaded to a server.

## Conventions used in existing tools

When adding a new tool or editing an existing one, match the established style:

- **Single file per tool.** Keep HTML, CSS, and JS in one `.html` file unless a
  tool grows large enough that splitting is clearly justified — ask before
  introducing a multi-file/build-based structure, since it's a departure from
  every existing tool here.
- **No external JS/CSS frameworks.** Tools use plain CSS (custom properties in
  `:root` for theme colors) and vanilla JavaScript (`DOMContentLoaded` listener,
  direct DOM queries via `getElementById`/`querySelectorAll`). Don't add React,
  jQuery, build tooling, or npm dependencies unless explicitly requested.
- **SEO-oriented page structure.** Pages include `<meta description>`,
  `<meta keywords>`, canonical link tags, an SEO content section explaining the
  tool, and an FAQ section. Preserve this pattern for new public-facing tools.
- **Ad placeholder blocks.** Existing pages include `.ad-container` /
  `.ad-placeholder` divs marked "Google AdSense Ad Unit" as layout placeholders.
  Keep these as placeholders — do not wire up real ad network code unless asked.
- **Client-side only, privacy-preserving.** Tools should not send user files or
  data to a server; process everything in-browser (canvas, FileReader, etc.),
  consistent with the existing image tool's "images are never uploaded" claim.

## Development workflow

There is no build, lint, or test tooling configured in this repo.

- To check a tool, open the `.html` file directly in a browser (or serve the
  directory with any static file server, e.g. `python3 -m http.server`).
- There are no automated tests. Verify changes manually in a browser — check the
  golden path (upload → adjust settings → process → download) and edge cases
  (oversized files, non-image files, drag-and-drop vs. browse button).
- No CI is configured as of this writing.

## Making changes

- Favor minimal, targeted edits within a tool's existing `<style>`/`<script>`
  blocks over introducing new files or external dependencies.
- If you add a new tool, follow the same single-file, no-dependency, SEO-page
  pattern as `img-compress.html` unless the user asks for something different.
