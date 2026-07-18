from dataclasses import dataclass
from pathlib import Path

@dataclass
class ExplorerNode:

    name: str

    path: Path

    is_directory: bool
