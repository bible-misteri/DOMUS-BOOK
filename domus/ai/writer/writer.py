from .outline import OutlineBuilder
from .draft import DraftBuilder
from .formatter import DraftFormatter
from .validator import DraftValidator


class AIWriter:

    def __init__(self):

        self.outline = OutlineBuilder()

        self.draft = DraftBuilder()

        self.formatter = DraftFormatter()

        self.validator = DraftValidator()

    def write(self, request):

        outline = self.outline.build(request)

        markdown = self.draft.build(outline)

        markdown = self.formatter.format(markdown)

        self.validator.validate(markdown)

        return markdown
