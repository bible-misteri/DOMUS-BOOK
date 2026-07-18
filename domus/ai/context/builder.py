from .sources import ContextSources
from .assembler import ContextAssembler
from .formatter import ContextFormatter
from .validator import ContextValidator

class ContextBuilder:

    def __init__(self):

        self.sources = ContextSources()

        self.assembler = ContextAssembler()

        self.formatter = ContextFormatter()

        self.validator = ContextValidator()

    def build(self):

        context = self.assembler.assemble(

            self.sources

        )

        self.validator.validate(context)

        return self.formatter.format(context)
