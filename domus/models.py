# ----------------------------------
# DOMUS Data Models
# ----------------------------------

from dataclasses import dataclass, field


@dataclass
class BibleReference:

    raw: str

    book: str

    chapter: int

    verse: int | None

    verse_end: int | None

    type: str

    valid: bool = False


@dataclass
class CitationResult:

    markdown: str

    references: list[BibleReference] = field(default_factory=list)

    warnings: list[str] = field(default_factory=list)
