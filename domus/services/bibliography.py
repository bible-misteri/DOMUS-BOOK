from .base import BaseService

from domus.bibliography.engine import BibliographyEngine


class BibliographyService(BaseService):

    name = "Bibliography"

    def __init__(self, provider):

        self.engine = BibliographyEngine(provider)

    def lookup(self, key):

        return self.engine.find(key)
