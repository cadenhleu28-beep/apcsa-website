#!/usr/bin/env python3
"""Generate PWA / iOS home-screen icons for the APCSA Study Guide.

Outputs to public/:
  apple-touch-icon.png  (180x180, iOS home screen)
  icon-192.png          (PWA / Android standard)
  icon-512.png          (PWA splash / high-res)
  favicon-32.png        (browser tab fallback)
  favicon.svg           (already referenced by index.html)
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import sys

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
PUBLIC.mkdir(exist_ok=True)

# Brand palette (matches the dark IDE aesthetic of the app)
BG = (13, 17, 23, 255)            # #0d1117 background
ACCENT = (244, 63, 94, 255)       # #f43f5e rose
TEXT = (230, 237, 243, 255)       # #e6edf3 off-white


def find_bold_font():
    """Locate a bold sans-serif font available on the system."""
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/Library/Fonts/Arial Bold.ttf",
    ]
    for c in candidates:
        if Path(c).exists():
            return c
    return None  # PIL will fall back to default


def render(size: int, text: str = "APCSA") -> Image.Image:
    img = Image.new("RGBA", (size, size), BG)
    draw = ImageDraw.Draw(img)

    # Fit the text to ~70% of width
    font_path = find_bold_font()
    target_w = int(size * 0.70)
    # Binary search for the largest font size that fits
    lo, hi = 8, size
    best = lo
    while lo <= hi:
        mid = (lo + hi) // 2
        font = ImageFont.truetype(font_path, mid) if font_path else ImageFont.load_default()
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        if w <= target_w:
            best = mid
            lo = mid + 1
        else:
            hi = mid - 1

    font = ImageFont.truetype(font_path, best) if font_path else ImageFont.load_default()
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    # Center horizontally; nudge slightly up to leave room for accent stripe
    x = (size - w) // 2 - bbox[0]
    y = (size - h) // 2 - bbox[1] - int(size * 0.04)
    draw.text((x, y), text, font=font, fill=TEXT)

    # Rose accent stripe at the bottom — small badge of identity
    stripe_h = max(2, size // 36)
    stripe_w = int(size * 0.30)
    stripe_x = (size - stripe_w) // 2
    stripe_y = int(size * 0.74)
    draw.rounded_rectangle(
        (stripe_x, stripe_y, stripe_x + stripe_w, stripe_y + stripe_h),
        radius=stripe_h // 2,
        fill=ACCENT,
    )

    return img


def main():
    sizes = {
        "apple-touch-icon.png": 180,
        "icon-192.png": 192,
        "icon-512.png": 512,
        "favicon-32.png": 32,
    }
    for name, size in sizes.items():
        img = render(size, "APCSA" if size >= 64 else "AP")
        out = PUBLIC / name
        img.save(out, "PNG", optimize=True)
        print(f"  wrote {out.relative_to(ROOT)} ({size}x{size})")

    # SVG favicon — simple, scales perfectly
    favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0d1117"/>
  <text x="32" y="38" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" font-size="22" font-weight="700" fill="#e6edf3">AP</text>
  <rect x="22" y="46" width="20" height="3" rx="1.5" fill="#f43f5e"/>
</svg>
'''
    (PUBLIC / "favicon.svg").write_text(favicon_svg)
    print(f"  wrote {(PUBLIC / 'favicon.svg').relative_to(ROOT)}")


if __name__ == "__main__":
    main()
