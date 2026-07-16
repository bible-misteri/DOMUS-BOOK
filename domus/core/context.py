from dataclasses import dataclass, field


@dataclass
class BuildContext:

    markdown: str = ""

    references: list = field(default_factory=list)

    registry: object = None

    statistics: dict = field(default_factory=dict)

    appendix: str = ""

    hyperlinks: list = field(default_factory=list)

    payload: dict = field(default_factory=dict)
