class ReasoningValidator:

    def validate(self, plan):

        return len(plan.steps) > 0
