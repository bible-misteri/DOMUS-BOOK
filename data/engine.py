class GlossaryEngine:

    def __init__(self, provider):

        self.provider = provider

    def find(self, term):

        return self.provider.lookup(term)
