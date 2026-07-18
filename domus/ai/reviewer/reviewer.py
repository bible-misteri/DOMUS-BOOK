from .inspector import DocumentInspector
from .checker import ReviewChecker
from .validator import ReviewValidator
from .scorer import ReviewScorer
from .report import ReviewReport

class AIReviewer:

    def __init__(self):

        self.inspector = DocumentInspector()

        self.checker = ReviewChecker()

        self.validator = ReviewValidator()

        self.scorer = ReviewScorer()

        self.report = ReviewReport()

    def review(self, request):

        document = self.inspector.inspect(
            request.markdown
        )

        issues = self.checker.check(document)

        passed = self.validator.validate(
            issues
        )

        score = self.scorer.score(
            issues
        )

        return self.report.build(
            passed,
            score,
            issues
        )
