#!/usr/bin/env python3

import sys
import re
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

files = sorted(manuscript.glob("*.md"))

if not files:
    print("ERROR: No markdown files found.")
    sys.exit(1)

numbers = []

for file in files:

    m = re.match(r"^(\d+)-", file.name)

    if not m:
        print(f"ERROR: Invalid filename: {file.name}")
        sys.exit(1)

    numbers.append(int(m.group(1)))

# Duplicate number
if len(numbers) != len(set(numbers)):
    print("ERROR: Duplicate markdown number detected.")
    sys.exit(1)

# Missing number
expected = list(range(min(numbers), max(numbers) + 1))

missing = sorted(set(expected) - set(numbers))

if missing:
    print("ERROR: Missing markdown number(s):")

    for n in missing:
        print(f"  {n:02d}")

    sys.exit(1)

print(f"✓ markdown ({len(files)} files)")

print()
print("Book validation passed.")
