from dataclasses import dataclass


@dataclass
class BuildResult:

    markdown: str

    success: bool = True
