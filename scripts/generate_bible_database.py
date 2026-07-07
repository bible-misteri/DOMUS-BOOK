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

NEW_TESTAMENT = []

# ----------------------------------
# Generate YAML
# ----------------------------------

def generate_database():

    database = {}

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
