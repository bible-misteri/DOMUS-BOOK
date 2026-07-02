#!/usr/bin/env python3

import sys
import yaml
from pathlib import Path

if len(sys.argv) < 2:
    print("Usage: validate_book.py <book-folder>")
    sys.exit(1)

book = Path(sys.argv[1])

print("==================================")
print("Checking book structure...")
print("==================================")

# -------------------------------------------------
# manuscript
# -------------------------------------------------

manuscript = book / "manuscript"

if not manuscript.is_dir():
    print("ERROR: manuscript folder not found.")
    sys.exit(1)

print("✓ manuscript")

# -------------------------------------------------
# images
# -------------------------------------------------

images = book / "images"

if not images.is_dir():
    print("ERROR: images folder not found.")
    sys.exit(1)

print("✓ images")

# -------------------------------------------------
# metadata
# -------------------------------------------------

metadata = book / "metadata.yaml"

if not metadata.is_file():
    print("ERROR: metadata.yaml not found.")
    sys.exit(1)

# -------------------------------------------------
# cover
# -------------------------------------------------

text = metadata.read_text(encoding="utf-8")

# Hilangkan delimiter Pandoc Front Matter
if text.startswith("---"):
    text = text[3:]

if text.rstrip().endswith("---"):
    text = text.rstrip()[:-3]

data = yaml.safe_load(text)

cover = book / data["cover"]

if not cover.is_file():
    print(f"ERROR: Cover image not found: {cover}")
    sys.exit(1)

print("✓ cover")

# -------------------------------------------------
# markdown
# -------------------------------------------------

count = len(list(manuscript.glob("*.md")))

if count == 0:
    print("ERROR: No markdown files found.")
    sys.exit(1)

print(f"✓ markdown ({count} files)")

print()
print("Book validation passed.")
