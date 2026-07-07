#!/usr/bin/env python3

from pathlib import Path
import yaml

print("==================================")
print("DOMUS Bible Database Generator")
print("==================================")
print()

repo_root = Path(__file__).resolve().parent.parent

output = repo_root / "data" / "bible_database.yaml"

# ----------------------------------
# OLD TESTAMENT
# ----------------------------------

OLD_TESTAMENT = []

# ----------------------------------
# NEW TESTAMENT
# ----------------------------------

NEW_TESTAMENT = [

    {
        "name": "Yohanes",
        "id": "JHN",
        "order": 43,
        "testament": "NT",

        "abbreviations": [
            "Yoh",
            "Joh"
        ],

        "aliases": [
            "John"
        ],

        "chapters": {
            1: 51,
            2: 25,
            3: 36
        }
    }

]

# ----------------------------------
# Generate YAML
# ----------------------------------

def generate_database():

    database = {}

    for book in OLD_TESTAMENT + NEW_TESTAMENT:

        database[book["name"]] = {

            "id": book["id"],
            "order": book["order"],
            "testament": book["testament"],
            "abbreviations": book["abbreviations"],
            "aliases": book["aliases"],
            "chapters": book["chapters"],
        }

    return database

# ----------------------------------
# Save bible_database.yaml
# ----------------------------------

def save_database(database):

    with output.open("w", encoding="utf-8") as f:
        yaml.dump(
            database,
            f,
            allow_unicode=True,
            sort_keys=False
        )

# ----------------------------------
# Main
# ----------------------------------

database = generate_database()

save_database(database)

print(f"Saved: {output}")
