import json


class GlossaryProvider:

    def __init__(self, path):

        with open(path, "r", encoding="utf-8") as f:

            self.data = json.load(f)

    def lookup(self, term):

        return self.data.get(term)
