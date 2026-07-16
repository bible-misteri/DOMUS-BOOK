import json

from pathlib import Path


class GlossaryService:

    def __init__(self, path):

        with open(path, "r", encoding="utf-8") as f:

            self.data = json.load(f)

    def lookup(self, word):

        return self.data.get(word)
