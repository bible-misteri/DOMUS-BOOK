from dataclasses import dataclass, field

@dataclass
class BookMemory:

    title: str

    chapters: list = field(default_factory=list)

    summaries: list = field(default_factory=list)

    glossary: list = field(default_factory=list)

    bibliography: list = field(default_factory=list)

    themes: list = field(default_factory=list)
