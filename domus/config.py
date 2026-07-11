from pathlib import Path
import yaml

repo_root = Path(__file__).resolve().parent.parent


def load_config():

    config = (
        repo_root
        / "config"
        / "metadata_sources.yaml"
    )

    with config.open(
        "r",
        encoding="utf-8"
    ) as f:

        return yaml.safe_load(f)
