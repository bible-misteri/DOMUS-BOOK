from dataclasses import dataclass, field

@dataclass
class ResearchResult:

    summary: str = ""

    verses: list = field(default_factory=list)

    glossary: list = field(default_factory=list)

    crossrefs: list = field(default_factory=list)

    bibliography: list = field(default_factory=list)

    graph_nodes: list = field(default_factory=list)

    score: float = 0.0
