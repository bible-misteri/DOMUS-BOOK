from .provider import CrossReferenceProvider


class CrossReferenceEngine:

    def __init__(self, provider):

        self.provider = provider

    def find(self, reference):

        key = (
            f"{reference.id.upper()}."
            f"{reference.chapter}."
            f"{reference.verse}"
        )

        return self.provider.lookup(key)
