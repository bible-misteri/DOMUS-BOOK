class ReviewScorer:

    def score(self, issues):

        return max(0, 100 - len(issues) * 5)
