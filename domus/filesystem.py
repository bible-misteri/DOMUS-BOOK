from pathlib import Path

repo_root = Path(__file__).resolve().parent.parent


def ensure_folder(folder):

    folder.mkdir(
        parents=True,
        exist_ok=True
    )

    return folder
