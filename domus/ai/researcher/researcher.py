from .collector import KnowledgeCollector
from .ranking import ResultRanking
from .analyzer import ResearchAnalyzer
from .synthesizer import ResearchSynthesizer


class AIResearcher:

    def __init__(self):

        self.collector = KnowledgeCollector()

        self.ranking = ResultRanking()

        self.analyzer = ResearchAnalyzer()

        self.synthesizer = ResearchSynthesizer()

    def research(self, request):

        collected = self.collector.collect(request)

        collected["verses"] = self.ranking.rank(

            collected["verses"]

        )

        analysis = self.analyzer.analyze(collected)

        return self.synthesizer.synthesize(

            collected,

            analysis

        )
