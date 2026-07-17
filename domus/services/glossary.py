from .base import BaseService

from domus.glossary.engine import GlossaryEngine


class GlossaryService(BaseService):

    name = "Glossary"

    def __init__(self, provider):

        self.engine = GlossaryEngine(provider)

    def lookup(self, term):

        return self.engine.find(term)
