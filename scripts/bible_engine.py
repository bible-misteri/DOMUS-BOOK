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


# ----------------------------------
# Reference Parser
# ----------------------------------

def parse_reference(ref):

    m = re.match(r"^(.*?)\s+(\d+)(?::(\d+))?$", ref.strip())

    if not m:
        return None

    return {
        "book": m.group(1).strip(),
        "chapter": int(m.group(2)),
        "verse": int(m.group(3)) if m.group(3) else None,
    }


# ----------------------------------
# Load Database
# ----------------------------------

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

    parsed = parse_reference(ref)

    if parsed is None:
        print()
        print("ERROR: Invalid Bible Reference")
        print(f"File      : {file.name}")
        print(f"Reference : {ref}")
        raise SystemExit(1)

    book_name = parsed["book"]

    book_name = ALIAS.get(book_name, book_name)
    book_name = ABBR.get(book_name, book_name)

    chapter = parsed["chapter"]
    verse = parsed["verse"]

    # ----------------------------------
    # Chapter Validator
    # ----------------------------------

    max_chapter = STRUCTURE.get(book_name)

    if max_chapter is None:
        print()
        print("ERROR: Book structure missing")
        print(f"Book : {book_name}")
        raise SystemExit(1)

    if chapter > max_chapter:
        print()
        print("ERROR: Invalid Chapter")
        print(f"Book      : {book_name}")
        print(f"Chapter   : {chapter}")
        print(f"Maximum   : {max_chapter}")
        raise SystemExit(1)

    print(f"       chapter={chapter}, verse={verse}")

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
