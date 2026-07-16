import json


class BibliographyProvider:

    def __init__(self, path):

        with open(path, "r", encoding="utf-8") as f:

            self.data = json.load(f)

    def lookup(self, key):

        return self.data.get(key)
