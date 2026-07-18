from dataclasses import dataclass, field

@dataclass

class PromptDocument:

    system: str = ""

    context: str = ""

    instruction: str = ""

    constraints: str = ""

    output: str = ""

    metadata: dict = field(default_factory=dict)
