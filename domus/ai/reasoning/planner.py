from dataclasses import dataclass, field

@dataclass
class ReasoningPlan:

    goal: str

    steps: list = field(default_factory=list)
