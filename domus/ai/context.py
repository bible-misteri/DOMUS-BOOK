from dataclasses import dataclass, field


@dataclass
class AIContext:

    book: str = ""

    language: str = "id"

    theme: str = "theology"

    citation_style: str = "Chicago"

    metadata: dict = field(default_factory=dict)
