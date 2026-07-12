# ----------------------------------
# DOMUS Citation Engine
# Version : 1.1.0
# ----------------------------------

from domus.processor import MarkdownProcessor


class CitationEngine:

    def __init__(self, database):

        self.processor = MarkdownProcessor(database)

    def replace(self, markdown):

        references = self.processor.process(markdown)

        return {

            "markdown": markdown,

            "references": references

        }
