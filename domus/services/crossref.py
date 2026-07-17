from .base import BaseService

from domus.crossref.engine import CrossReferenceEngine


class CrossReferenceService(BaseService):

    name = "CrossReference"

    def __init__(self, provider):

        self.engine = CrossReferenceEngine(provider)

    def lookup(self, reference):

        return self.engine.find(reference)
