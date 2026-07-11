#!/usr/bin/env python3

from pathlib import Path
import json
import yaml

repo_root = Path(__file__).resolve().parent.parent

print("==================================")
print("DOMUS Metadata Importer")
print("==================================")
print()

 

# ----------------------------------
# Configuration Loader
# ----------------------------------

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

config = load_config()

# ----------------------------------
# Metadata Path
# ----------------------------------

def get_metadata_path(config):

    output = (
        config["sources"]["bible"]["output"]
    )

    return repo_root / output

# ----------------------------------
# Metadata Loader
# ----------------------------------

def load_metadata(config):

    metadata = get_metadata_path(config)

    with metadata.open(
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)

config = load_config()

metadata = load_metadata(config)

print("Provider :", config["metadata"]["provider"])
print("Books    :", len(metadata["books"]))

print()
print("Metadata loaded successfully.")

