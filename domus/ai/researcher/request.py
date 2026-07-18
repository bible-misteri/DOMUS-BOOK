from dataclasses import dataclass

@dataclass
class ResearchRequest:

    query: str

    language: str = "id"

    max_results: int = 20

    include_bible: bool = True

    include_glossary: bool = True

    include_crossrefs: bool = True

    include_bibliography: bool = True

    include_graph: bool = True
