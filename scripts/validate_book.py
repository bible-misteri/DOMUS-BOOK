#!/usr/bin/env python3

import sys
from pathlib import Path
import yaml

book = Path(sys.argv[1])

print("==================================")
print("Checking book structure...")
print("==================================")

manuscript = book / "manuscript"
if not manuscript.is_dir():
    print("ERROR: manuscript folder not found.")
    sys.exit(1)
print("✓ manuscript")

images = book / "images"
if not images.is_dir():
    print("ERROR: images folder not found.")
    sys.exit(1)
print("✓ images")

with open(book / "metadata.yaml", encoding="utf-8") as f:
    meta = yaml.safe_load(f)

cover = book / meta["cover"]

if not cover.is_file():
    print(f"ERROR: Cover image not found: {cover}")
    sys.exit(1)
print("✓ cover")

count = len(list(manuscript.glob("*.md")))

if count == 0:
    print("ERROR: No markdown files found.")
    sys.exit(1)

print(f"✓ markdown ({count} files)")
print()
print("Book validation passed.")
