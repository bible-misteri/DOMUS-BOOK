class BibliographyEngine:

    def __init__(self, provider):

        self.provider = provider

    def find(self, key):

        return self.provider.lookup(key)
