from dataclasses import dataclass, field

@dataclass
class AIContext:

    project: dict = field(default_factory=dict)

    chapter: dict = field(default_factory=dict)

    knowledge: list = field(default_factory=list)

    glossary: list = field(default_factory=list)

    bibliography: list = field(default_factory=list)

    references: list = field(default_factory=list)

    memory: list = field(default_factory=list)
