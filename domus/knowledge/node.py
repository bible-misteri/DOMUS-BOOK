from dataclasses import dataclass, field

@dataclass
class KnowledgeNode:

    id: str

    label: str

    type: str

    properties: dict = field(default_factory=dict)
