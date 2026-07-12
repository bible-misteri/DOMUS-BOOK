from pathlib import Path
import yaml

repo_root = Path(__file__).resolve().parent.parent


def load_aliases():

    aliases_file = (
        repo_root
        / "data"
        / "generated"
        / "book_aliases.yaml"
    )

    with aliases_file.open(
        "r",
        encoding="utf-8"
    ) as f:

        return yaml.safe_load(f)

# ----------------------------------
# DOMUS Reference Resolver
# ----------------------------------

def resolve(reference, aliases):

    book = reference["book"]

    if book in aliases:

        reference["book"] = aliases[book]

    return reference
