# ----------------------------------
# Backup Metadata
# ----------------------------------

from datetime import datetime
import shutil

def backup_metadata(config):

    backup = config["backup"]

    if not backup["enabled"]:
        return

    source = get_metadata_path(config)

    if not source.exists():
        return

    folder = (
        repo_root
        / backup["folder"]
    )

    folder.mkdir(
        parents=True,
        exist_ok=True
    )

    timestamp = datetime.now().strftime(
        "%Y%m%d-%H%M%S"
    )

    destination = (
        folder
        / f"bible_metadata-{timestamp}.json"
    )

    shutil.copy2(
        source,
        destination
    )

    print(f"✓ Backup : {destination.name}")

# ----------------------------------
# Save Metadata
# ----------------------------------

def save_metadata(config, metadata):

    output = get_metadata_path(config)

    output.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    with output.open(
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            metadata,
            f,
            indent=2,
            ensure_ascii=False
        )

    print(
        f"✓ Saved : {output}"
    )

config = load_config()

metadata = load_metadata(config)

validate_metadata(metadata)

backup_metadata(config)

save_metadata(config, metadata)

print()

print("Metadata update finished.")
