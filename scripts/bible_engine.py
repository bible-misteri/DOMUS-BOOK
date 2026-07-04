#!/usr/bin/env python3

import re
from pathlib import Path

print("==================================")
print("DOMUS Bible Engine")
print("==================================")

book = Path(".")

manuscript = book / "manuscript"

files = sorted(manuscript.glob("*.md"))

total_lines = 0

for file in files:

    text = file.read_text(encoding="utf-8")

    lines = text.splitlines()

    total_lines += len(lines)

    print(f"✓ {file.name:20} {len(lines):4} lines")

print("----------------------------------")
print(f"Total Markdown Files : {len(files)}")
print(f"Total Lines          : {total_lines}")

print()
print("Bible Engine ready.")
