# ----------------------------------
# DOMUS Registry
# Version : 1.0.0
# ----------------------------------

from dataclasses import dataclass


@dataclass
class RegistryItem:

    type: str

    key: str

    anchor: str


class Registry:

    def __init__(self):

        self.items = {}

    def add(self, item):

        self.items[item.key] = item

    def get(self, key):

        return self.items.get(key)

    def exists(self, key):

        return key in self.items

    def all(self):

        return list(self.items.values())
