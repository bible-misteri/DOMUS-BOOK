# ----------------------------------
# DOMUS Publisher
# ----------------------------------

from domus.citation import CitationEngine


class Publisher:

    def __init__(self, database):

        self.citation = CitationEngine(database)

    def publish(self, markdown):

        result = self.citation.replace(markdown)

        return result.markdown
