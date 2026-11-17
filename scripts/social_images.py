#!/usr/bin/env python3
"""Generate 1200x630 PNG previews for Cuartelia during GitHub Pages deployment."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import cairosvg
import re

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public' / 'og'
POSTS = ROOT / 'src' / 'content' / 'articulos'
BRAND = ROOT / 'src' / 'components' / 'Brand.astro'
OUTPUT.mkdir(parents=True, exist_ok=True)

FONT_REGULAR = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
CREAM = '#f7f5ef'
INK = '#16282c'
RUST = '#ec6a49'
SOFT = '#bdcac2'


def font(size, bold=False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)


def wrap(draw, title, max_width, title_font):
    lines = []
    current = ''
    for word in title.split():
        candidate = (current + ' ' + word).strip()
        if current and draw.textbbox((0, 0), candidate, font=title_font)[2] > max_width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def brand_mark():
    """Render the actual SVG used in Cuartelia's header; never redraw the logo."""
    markup = BRAND.read_text(encoding='utf-8')
    match = re.search(r'<svg\b[^>]*>.*?</svg>', markup, flags=re.DOTALL)
    if not match:
        raise ValueError('Brand.astro no contiene el SVG del isotipo')
    svg = match.group(0).replace('currentColor', RUST)
    svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1)
    png = cairosvg.svg2png(bytestring=svg.encode('utf-8'), output_width=62, output_height=62)
    return Image.open(BytesIO(png)).convert('RGBA')


MARK = brand_mark()


def make_card(title, label, filename):
    image = Image.new('RGB', (1200, 630), INK)
    draw = ImageDraw.Draw(image)
    for radius in (210, 285, 360):
        draw.ellipse((995-radius, 95-radius, 995+radius, 95+radius), outline='#3e5555', width=2)
    image.paste(MARK, (74, 70), MARK)
    draw.text((155, 75), 'CUARTELIA', font=font(38, True), fill=CREAM)
    draw.text((76, 185), label.upper(), font=font(22, True), fill=RUST)
    title_font = font(59, True)
    lines = wrap(draw, title, 1030, title_font)
    if len(lines) > 4:
        title_font = font(48, True)
        lines = wrap(draw, title, 1030, title_font)
    y = 234
    for line in lines[:5]:
        draw.text((72, y), line, font=title_font, fill=CREAM)
        y += title_font.size + 18
    draw.line((74, 555, 1126, 555), fill='#61736f', width=2)
    draw.text((74, 575), 'HISTORIA  ·  CIENCIA  ·  FORMACIÓN', font=font(19), fill=SOFT)
    image.save(OUTPUT / filename, optimize=True)


def frontmatter_value(text, key):
    match = re.search(r'^' + re.escape(key) + r':\s*(.*)$', text, re.MULTILINE)
    return match.group(1).strip().strip("'\"") if match else ''


make_card('Conocé Cuartelia', 'Historia, ciencia y formación bomberil', 'home.png')
for post in POSTS.glob('*.md'):
    content = post.read_text(encoding='utf-8')
    frontmatter = content.split('---', 2)[1]
    if frontmatter_value(frontmatter, 'draft').lower() == 'true':
        continue
    title = frontmatter_value(frontmatter, 'title')
    category = frontmatter_value(frontmatter, 'category')
    if title:
        make_card(title, category or 'Artículos', post.stem + '.png')
print('Social preview PNG files generated in', OUTPUT)
