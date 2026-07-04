#!/usr/bin/env python3

import re
from pathlib import Path
BOOKS = {

    "Kejadian",
    "Keluaran",
    "Imamat",
    "Bilangan",
    "Ulangan",

    "Yosua",
    "Hakim-hakim",
    "Rut",

    "1 Samuel",
    "2 Samuel",

    "1 Raja-raja",
    "2 Raja-raja",

    "Mazmur",
    "Amsal",
    "Pengkhotbah",

    "Yesaya",
    "Yeremia",
    "Yehezkiel",
    "Daniel",

    "Matius",
    "Markus",
    "Lukas",
    "Yohanes",

    "Kisah Para Rasul",

    "Roma",

    "1 Korintus",
    "2 Korintus",

    "Galatia",
    "Efesus",
    "Filipi",
    "Kolose",

    "Ibrani",

    "Yakobus",

    "1 Petrus",
    "2 Petrus",

    "1 Yohanes",
    "2 Yohanes",
    "3 Yohanes",

    "Yudas",

    "Wahyu"

}

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
