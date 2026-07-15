# ----------------------------------
# DOMUS Citation Engine
# Version : 1.1.0
# ----------------------------------

from domus.processor import MarkdownProcessor
from domus.models import CitationResult
from domus.markup import build


class CitationEngine:

    def __init__(self, database):

        self.processor = MarkdownProcessor(database)

    def replace(self, markdown):

    result = self.processor.process(markdown)

    new_markdown = markdown

    for ref in result.references:

        dim = build(ref)

        new_markdown = new_markdown.replace(
            ref.raw,
            dim
        )

    result.markdown = new_markdown

    return result
