#!/usr/bin/env python3

import re
import yaml
from pathlib import Path
repo_root = Path(__file__).resolve().parent.parent

db = repo_root / "data" / "bible_books.yaml"

alias_db = repo_root / "data" / "bible_alias.yaml"

abbr_db = repo_root / "data" / "bible_abbreviations.yaml"

structure_db = repo_root / "data" / "bible_structure.yaml"

with db.open("r", encoding="utf-8") as f:
    data = yaml.safe_load(f)

with alias_db.open("r", encoding="utf-8") as f:
    ALIAS = yaml.safe_load(f)

with abbr_db.open("r", encoding="utf-8") as f:

with structure_db.open("r", encoding="utf-8") as f:
    STRUCTURE = yaml.safe_load(f)
    ABBR = yaml.safe_load(f)

BOOKS = set()

BOOKS.update(data["old_testament"])
BOOKS.update(data["new_testament"])

print("==================================")
print("DOMUS Bible Engine")
print("==================================")

book = Path(".")

manuscript = book / "manuscript"

files = sorted(manuscript.glob("*.md"))

total_lines = 0

for file in files:

    text = file.read_text(encoding="utf-8")

    # ----------------------------------
# Detect Bible References
# ----------------------------------

references = re.findall(r"\[([^\]]+)\]", text)

lines = text.splitlines()

total_lines += len(lines)

print(f"✓ {file.name:20} {len(lines):4} lines")

for ref in references:

    print(f"    📖 {ref}")

    book_name = re.sub(r"\s+\d.*$", "", ref).strip()

    book_name = ALIAS.get(book_name, book_name)

    book_name = ABBR.get(book_name, book_name)

    if book_name in BOOKS:
        print("       ✓ valid")
    else:
        print()
        print("ERROR: Unknown Bible Book")
        print(f"File      : {file.name}")
        print(f"Reference : {ref}")
        raise SystemExit(1)

print("----------------------------------")
print(f"Total Markdown Files : {len(files)}")
print(f"Total Lines          : {total_lines}")

print()
print("Bible Engine ready.")
