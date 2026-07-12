# ----------------------------------
# DOMUS Markdown Processor
# ----------------------------------

from domus.engine import BibleEngine


class MarkdownProcessor:

    def __init__(self, database):

        self.engine = BibleEngine(database)


    def process(self, text):

        return self.engine.parse_text(text)
