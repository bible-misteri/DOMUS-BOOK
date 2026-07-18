from dataclasses import dataclass, field

@dataclass
class ReviewResult:

    passed: bool = False

    score: float = 0

    warnings: list = field(default_factory=list)

    errors: list = field(default_factory=list)

    suggestions: list = field(default_factory=list)
