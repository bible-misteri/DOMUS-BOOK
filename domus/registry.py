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

    def build_anchor(reference):

    anchor = f"bible-{reference.id.lower()}-{reference.chapter}"

    if reference.verse is not None:

        anchor += f"-{reference.verse}"

        if reference.verse_end:

            anchor += f"-{reference.verse_end}"

    return anchor

    def register_reference(registry, reference):

    key = build_anchor(reference)

    registry.add(

        RegistryItem(

            type="bible",

            key=key,

            anchor=key

        )

    )

    return key
