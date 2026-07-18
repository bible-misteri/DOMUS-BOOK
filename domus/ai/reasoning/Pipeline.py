from .planner import ReasoningPlan
from .hypothesis import HypothesisBuilder
from .evidence import EvidenceCollector
from .conclusion import ConclusionBuilder
from .validator import ReasoningValidator

class ReasoningPipeline:

    def __init__(self):

        self.hypothesis = HypothesisBuilder()
        self.evidence = EvidenceCollector()
        self.conclusion = ConclusionBuilder()
        self.validator = ReasoningValidator()

    def prepare(self, request, research_result):

        plan = ReasoningPlan(
            goal=request.topic,
            steps=[
                "Identifikasi topik",
                "Analisis bukti",
                "Susun argumen",
                "Simpulkan"
            ]
        )

        hypotheses = self.hypothesis.build(request)
        evidence = self.evidence.collect(research_result)
        conclusion = self.conclusion.build(evidence)

        self.validator.validate(plan)

        return {
            "plan": plan,
            "hypotheses": hypotheses,
            "evidence": evidence,
            "conclusion": conclusion
        }
