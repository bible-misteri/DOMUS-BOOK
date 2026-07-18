from dataclasses import dataclass, field

@dataclass
class EvidenceResult:

    score: float = 0

    supported: list = field(default_factory=list)

    unsupported: list = field(default_factory=list)

    warnings: list = field(default_factory=list)
