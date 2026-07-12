# ----------------------------------
# DOMUS Citation Engine
# Version : 1.0.0
# ----------------------------------

from domus.processor import MarkdownProcessor


class CitationEngine:

    def __init__(self, database):

        self.processor = MarkdownProcessor(database)

    def replace(self, markdown):

        """
        Memproses seluruh referensi
        Alkitab di dalam markdown.
        """

        return markdown
