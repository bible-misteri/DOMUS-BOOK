from dataclasses import dataclass, field

@dataclass
class ConsistencyResult:

    passed: bool = True

    score: float = 100.0

    warnings: list = field(default_factory=list)

    conflicts: list = field(default_factory=list)
