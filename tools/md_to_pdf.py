#!/usr/bin/env python3
import os
import re
import textwrap

try:
    from reportlab.lib.pagesizes import A4
    from reportlab.pdfgen import canvas
    from reportlab.lib.units import mm
except Exception as e:
    raise

# Paths
BASE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))
INPUT = os.path.join(BASE, 'cv', 'resume_ux.md')
OUTPUT = os.path.join(BASE, 'cv', 'resume_ux.pdf')

# Read markdown
with open(INPUT, 'r', encoding='utf-8') as f:
    md = f.read()

# Simple markdown -> plain text conversions
# Convert links [text](url) -> "text (url)"
md = re.sub(r"\[(.*?)\]\((.*?)\)", r"\1 (\2)", md)
# Remove bold/italic markers
md = md.replace('**', '').replace('*', '')
# Normalize bullets
md = re.sub(r"^\s*-\s+", '• ', md, flags=re.MULTILINE)
# Remove excessive backslashes
md = md.replace('\\', '')

# Convert headings: keep them as lines and add spacing
lines = []
for line in md.splitlines():
    l = line.rstrip()
    if l.startswith('# '):
        lines.append(l[2:].upper())
        lines.append('')
    elif l.startswith('## '):
        lines.append(l[3:])
        lines.append('')
    elif l.startswith('### '):
        lines.append(l[4:])
        lines.append('')
    elif l.strip() == '---':
        lines.append('')
    else:
        lines.append(l)

text = '\n'.join(lines)

# Wrap paragraphs to a character width
wrap_width = 72
wrapped_lines = []
for paragraph in text.split('\n\n'):
    para = paragraph.strip()
    if not para:
        wrapped_lines.append('')
        continue
    # Preserve existing short lines (like headings or bullets)
    sublines = para.splitlines()
    for sub in sublines:
        if not sub.strip():
            wrapped_lines.append('')
            continue
        # If line starts with a bullet or is short, keep it
        if sub.startswith('• ') or len(sub) < wrap_width:
            wrapped_lines.append(sub)
        else:
            for w in textwrap.wrap(sub, width=wrap_width):
                wrapped_lines.append(w)
    wrapped_lines.append('')

# Create PDF
page_width, page_height = A4
margin = 20 * mm
c = canvas.Canvas(OUTPUT, pagesize=A4)
font_name = 'Helvetica'
font_size = 11
c.setFont(font_name, font_size)
line_height = font_size * 1.2
x = margin
y = page_height - margin

for line in wrapped_lines:
    if y < margin + line_height:
        c.showPage()
        c.setFont(font_name, font_size)
        y = page_height - margin
    # Draw the line
    c.drawString(x, y, line)
    y -= line_height

c.save()
print('Saved PDF to', OUTPUT)
