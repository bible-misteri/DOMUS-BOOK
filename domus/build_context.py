from dataclasses import dataclass


@dataclass
class BuildContext:

    markdown: str

    registry: object

    statistics: dict

    appendix: str
