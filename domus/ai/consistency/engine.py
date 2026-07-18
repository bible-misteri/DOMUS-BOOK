from .analyzer import Analyzer
from .comparer import Comparer
from .report import ReportBuilder

class ConsistencyEngine:

    def __init__(self):

        self.analyzer = Analyzer()

        self.comparer = Comparer()

        self.report = ReportBuilder()

    def check(self, request):

        project = self.analyzer.load(request)

        conflicts = self.comparer.compare(project)

        return self.report.build(conflicts)
