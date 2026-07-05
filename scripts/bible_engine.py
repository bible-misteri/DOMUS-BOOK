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
# Book Normalizer
# ----------------------------------

def normalize_book(book_name):

    # isi normalize_book yang sekarang
    # (tetap seperti yang sudah hijau)

    return None


# ----------------------------------
# Bible Sort
# ----------------------------------

def get_sorted_books():

    return sorted(
        BIBLE_INDEX.keys(),
        key=lambda book: BIBLE[book]["order"]
    )

# ----------------------------------
# Verse Sort
# ----------------------------------

def sort_references(refs):

    def key(ref):

        if ":" in ref:
            c, v = ref.split(":")
            return (int(c), int(v))

        return (int(ref), 0)

    return sorted(refs, key=key)


# ----------------------------------
# Bible Index Writer
# ----------------------------------

def write_bible_index():

    output = Path("output")

    output.mkdir(exist_ok=True)

    index_file = output / "bible-index.md"

    with index_file.open("w", encoding="utf-8") as f:

        f.write("# Bible Index\n\n")

        for book_name in get_sorted_books():

            f.write(f"## {book}\n\n")
            verses = sort_references(BIBLE_INDEX[book_name])

            for ref in verses:
                f.write(f"- {ref}\n")

            f.write("\n")


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

BIBLE = load_yaml("bible_database.yaml")

# ----------------------------------
# Bible Index
# ----------------------------------

BIBLE_INDEX = {}


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

    book_name = normalize_book(parsed["book"])

    if book_name is None:
        ...
        print()
        print("ERROR: Unknown Bible Book")
        print(f"Reference : {ref}")
        raise SystemExit(1)
    chapter = parsed["chapter"]
    verse = parsed["verse"]
    
    if book_name not in BIBLE_INDEX:
        BIBLE_INDEX[book_name] = set()

    if verse is None:
        BIBLE_INDEX[book_name].add(f"{chapter}")
    else:
        BIBLE_INDEX[book_name].add(f"{chapter}:{verse}")

# ----------------------------------
# Chapter Validator
# ----------------------------------

    chapters = BIBLE[book_name]["chapters"]

    max_chapter = len(chapters)

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

    # ----------------------------------
    # Verse Validator
    # ----------------------------------

    if verse is not None:

        max_verse = chapters[chapter]

        if verse > max_verse:
            print()
            print("ERROR: Invalid Verse")
            print(f"Book      : {book_name}")
            print(f"Chapter   : {chapter}")
            print(f"Verse     : {verse}")
            print(f"Maximum   : {max_verse}")
            raise SystemExit(1)

    print(f"       chapter={chapter}, verse={verse}")
    print("       ✓ valid")

print("----------------------------------")
print(f"Total Markdown Files : {len(files)}")
print(f"Total Lines          : {total_lines}")

print()
print("Bible Engine ready.")
write_bible_index()
