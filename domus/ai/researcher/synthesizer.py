from .result import ResearchResult

class ResearchSynthesizer:

    def synthesize(

        self,

        collected,

        analysis

    ):

        result = ResearchResult()

        result.summary = "Research completed."

        result.verses = collected["verses"]

        result.glossary = collected["glossary"]

        result.crossrefs = collected["crossrefs"]

        result.bibliography = collected["bibliography"]

        result.graph_nodes = collected["graph"]

        result.score = 1.0

        return result
