#!/usr/bin/env python3

import json
import yaml

from pathlib import Path

repo_root = Path(__file__).resolve().parent.parent

print("==================================")
print("DOMUS Midvash Importer")
print("==================================")
print()

RAW_FILE = (
    repo_root
    / "data"
    / "raw"
    / "midvash.json"
)

OUTPUT_FILE = (
    repo_root
    / "data"
    / "canonical"
    / "bible_source.yaml"
)

def load_midvash():

   if not RAW_FILE.exists():
      raise FileNotFoundError(
          f"Midvash dataset not found: {RAW_FILE}"
      )

    with RAW_FILE.open(
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)

def convert(data):

    source = {
        "books": []
    }

    for book in data:

        domus_book = {

            "name": "",

            "id": "",

            "order": 0,

            "testament": "",

            "abbreviations": [],

            "aliases": [],

            "chapters": []

        }

        source["books"].append(domus_book)

    return source

def save_source(source):

    OUTPUT_FILE.parent.mkdir(
        exist_ok=True
    )

    with OUTPUT_FILE.open(
        "w",
        encoding="utf-8"
    ) as f:

        yaml.dump(

            source,

            f,

            allow_unicode=True,

            sort_keys=False,

            default_flow_style=False

        )

    print(f"✓ Saved : {OUTPUT_FILE}")

# ----------------------------------
# Main
# ----------------------------------

if __name__ == "__main__":

    midvash = load_midvash()

    source = convert(midvash)

    save_source(source)

    print()
    print("Import finished.")
