#!/usr/bin/env python3

from pathlib import Path

print("==================================")
print("DOMUS Bible Engine")
print("==================================")

book = Path(".")

manuscript = book / "manuscript"

if not manuscript.is_dir():
    print("ERROR: manuscript folder not found.")
    raise SystemExit(1)

files = sorted(manuscript.glob("*.md"))

print(f"✓ {len(files)} markdown files found")

for file in files:
    print(f"  - {file.name}")

print()
print("Bible Engine ready.")
