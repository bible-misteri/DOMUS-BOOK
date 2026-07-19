from dataclasses import dataclass
from pathlib import Path


@dataclass
class Project:

    name: str

    path: Path

    author: str = ""

    language: str = ""

    progress: int = 0

    status: str = "Draft"
