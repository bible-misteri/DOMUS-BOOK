from .result import ReviewResult

class ReviewReport:

    def build(self, passed, score, issues):

        result = ReviewResult()

        result.passed = passed

        result.score = score

        result.errors = issues

        return result
