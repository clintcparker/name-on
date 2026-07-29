# How to Regenerate the README Screenshots

The images in [`docs/images/`](../images/) are captured from the real app with Playwright, not drawn
by hand. Regenerate them whenever the UI or the CLI output format changes.

| Asset | What it shows | Source |
|---|---|---|
| `web-demo.gif` | Regenerating names in the web app | Live Blazor app |
| `web-options.png` | The expanded customization panel | Live Blazor app |
| `cli-demo.gif` | A `name-on` terminal session | Real CLI output, rendered in a styled HTML terminal |

## Prerequisites

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- A Playwright-driven browser (the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) works well)
- `ffmpeg`, for assembling frames into GIFs (`brew install ffmpeg`)

All frames are captured at a 720&nbsp;px CSS width, which keeps the GIFs under ~30&nbsp;KB and
readable at GitHub's README width.

## Capture the web app images

1. Serve the app locally on a fixed port:

   ```sh
   dotnet run --project name-on-blazor --urls http://localhost:5199
   ```

2. Point the browser at `http://localhost:5199/` and set the viewport to 960&times;620.

3. Screenshot the `main` element rather than the full page. This crops out the footer, which shows
   `Commit: unknown` on a local build and would be misleading in a README.

4. For `web-options.png`, click **Show Options** first, then blur the focused element so the button
   does not render with a focus ring:

   ```js
   document.activeElement && document.activeElement.blur();
   ```

5. For `web-demo.gif`, capture one frame per generated name into a scratch directory. Click the
   regenerate button programmatically between frames, blurring focus each time:

   ```js
   document.querySelector('.btn-primary').click();
   document.activeElement && document.activeElement.blur();
   ```

   Eight frames is enough to read as an animation without bloating the file.

6. Assemble the frames:

   ```sh
   ffmpeg -y -framerate 1.25 -pattern_type glob -i 'frames/frame-*.png' \
     -filter_complex "[0:v]split[a][b];[a]palettegen=max_colors=64:stats_mode=diff[p];[b][p]paletteuse=dither=none" \
     -loop 0 docs/images/web-demo.gif
   ```

## Capture the CLI demo

The terminal GIF is a styled HTML page screenshotted by Playwright. Only the *styling* is synthetic —
every name in it is copied from a real run, so the output stays honest.

1. Build the CLI and run the commands you want to show, recording their exact output:

   ```sh
   dotnet build name-on.sln -c Release
   ./name-on-cli/bin/Release/net10.0/name-on -n 5
   ```

2. Paste that output into a scratch HTML page styled to look like a terminal, with each line in its
   own element and a `reveal(n)` function that shows the first `n` lines. Give the terminal a
   **fixed** width and height — every GIF frame must have identical dimensions or `ffmpeg` will
   reject them.

3. Serve the page over HTTP (Playwright blocks the `file:` protocol):

   ```sh
   python3 -m http.server 5210 --bind 127.0.0.1
   ```

4. Step `reveal(n)` forward one meaningful line at a time, screenshotting the terminal element after
   each step. Skip blank lines — revealing one produces a duplicate frame.

5. Duplicate the final frame two or three times so the animation pauses before looping, then
   assemble at a slightly faster rate:

   ```sh
   ffmpeg -y -framerate 2 -pattern_type glob -i 'frames/frame-*.png' \
     -filter_complex "[0:v]split[a][b];[a]palettegen=max_colors=64:stats_mode=diff[p];[b][p]paletteuse=dither=none" \
     -loop 0 docs/images/cli-demo.gif
   ```

## Clean up

Playwright writes screenshots relative to the working directory, so captures and scratch frame
directories can land in the repo root. Remove them before committing:

```sh
rm -rf .playwright-mcp frames
git status --short
```

Only `docs/images/` should show as modified.

## Troubleshooting

### Problem: `ffmpeg` fails with a frame size mismatch

**Solution:** One or more frames were captured at a different size. Element screenshots resize with
their content, so pin the element's dimensions (the CLI terminal) or screenshot a container whose
size does not change between frames.

### Problem: A button renders with a focus ring

**Solution:** Clicking leaves the element focused. Call `document.activeElement.blur()` and wait a
frame before screenshotting.

### Problem: The GIF is much larger than ~50 KB

**Solution:** Lower the frame count, keep the width at 720 px, or reduce `max_colors`. These
screenshots are flat-colored UI, so 64 colors with `dither=none` is plenty.
