#!/usr/bin/env python3

import re
import yaml
from pathlib import Path
repo_root = Path(__file__).resolve().parent.parent

# ----------------------------------
# YAML Loader
# ----------------------------------

def load_yaml(filename):

    path = repo_root / "data" / filename

    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)

data = load_yaml("bible_books.yaml")

ALIAS = load_yaml("bible_alias.yaml")

ABBR = load_yaml("bible_abbreviations.yaml")

STRUCTURE = load_yaml("bible_structure.yaml")
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
