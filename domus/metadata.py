import json

from pathlib import Path

repo_root = Path(__file__).resolve().parent.parent


def load_metadata(path):

    with path.open(
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)


def save_metadata(path, metadata):

    with path.open(
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            metadata,
            f,
            indent=2,
            ensure_ascii=False
        )
