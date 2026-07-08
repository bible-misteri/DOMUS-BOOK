#!/usr/bin/env python3

import json
import yaml

from pathlib import Path

repo_root = Path(__file__).resolve().parent.parent

print("==================================")
print("DOMUS Bible Database Generator")
print("==================================")
print()

output = repo_root / "data" / "bible_database.yaml"

# ----------------------------------
# YAML Loader
# ----------------------------------

# ----------------------------------
# Canonical Source Loader
# ----------------------------------

def load_source():

    source = (
        repo_root
        / "data"
        / "canonical"
        / "bible_source.yaml"
    )

    with source.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)

# ----------------------------------
# Midvash Loader
# ----------------------------------

def load_midvash():

    source = (
        repo_root
        / "data"
        / "raw"
        / "midvash.json"
    )

    with source.open("r", encoding="utf-8") as f:
        return json.load(f)

# ----------------------------------
# Source Selector
# ----------------------------------

def get_source():

    # Current Development Mode
    return load_source()

    # Future Release Mode
    # return load_midvash()

# ----------------------------------
# Generate Bible Database
# ----------------------------------

def generate_database():

    source = get_source()

    database = {}

    for book in source["books"]:

        chapters = {}

        for i, verse_count in enumerate(book["chapters"], start=1):
            chapters[i] = verse_count

        database[book["name"]] = {

            "id": book["id"],
            "order": book["order"],
            "testament": book["testament"],
            "abbreviations": book["abbreviations"],
            "aliases": book["aliases"],
            "chapters": chapters,
        }

    return database
    
# ----------------------------------
# Save Bible Database
# ----------------------------------

def save_database(database):

    output.parent.mkdir(exist_ok=True)

    with output.open("w", encoding="utf-8") as f:

        yaml.dump(
            database,
            f,
            allow_unicode=True,
            sort_keys=False,
            default_flow_style=False
        )

    print(f"✓ Saved : {output}")
    
# ----------------------------------
# Main
# ----------------------------------

database = generate_database()

chapter_count = 0
verse_count = 0

for book in database.values():
    chapter_count += len(book["chapters"])
    verse_count += sum(book["chapters"].values())

print(f"Books    : {len(database)}")
print(f"Chapters : {chapter_count}")
print(f"Verses   : {verse_count}")

print(f"Books : {len(database)}")

save_database(database)

print()
print("Bible Database Generator finished.")
