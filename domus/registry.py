# ----------------------------------
# DOMUS Registry
# Version : 2.0.0
# ----------------------------------

from dataclasses import dataclass, field


@dataclass
class RegistryItem:

    # Namespace
    namespace: str

    # Unique key
    key: str

    # Hyperlink anchor
    anchor: str

    # Human readable label
    label: str = ""

    # Source file
    source: str = ""

    # Position
    line: int | None = None
    column: int | None = None

    # Extra metadata
    attributes: dict = field(default_factory=dict)

    # Original object
    payload: object | None = None


class Registry:

    def __init__(self):

        self.items = {}

    # ------------------------------

    def add(self, item):

        self.items[item.key] = item

    # ------------------------------

    def get(self, key):

        return self.items.get(key)

    # ------------------------------

    def exists(self, key):

        return key in self.items

    # ------------------------------

    def remove(self, key):

        if key in self.items:

            del self.items[key]

    # ------------------------------

    def clear(self):

        self.items.clear()

    # ------------------------------

    def count(self):

        return len(self.items)

    # ------------------------------

    def all(self):

        return list(self.items.values())

    # ------------------------------

    def find_by_namespace(self, namespace):

        return [

            item.payload

            for item in self.items.values()

            if item.namespace == namespace

        ]

    # ------------------------------

    def find_by_source(self, source):

        return [

            item

            for item in self.items.values()

            if item.source == source

        ]

    # ------------------------------

    def summary(self):

        summary = {}

        for item in self.items.values():

            summary[item.namespace] = (

                summary.get(item.namespace, 0) + 1

            )

        return summary


# ----------------------------------
# Anchor Builder
# ----------------------------------

def build_anchor(reference):

    anchor = f"bible-{reference.id.lower()}-{reference.chapter}"

    if reference.verse is not None:

        anchor += f"-{reference.verse}"

        if reference.verse_end:

            anchor += f"-{reference.verse_end}"

    return anchor


# ----------------------------------
# Register Bible Reference
# ----------------------------------

def register_reference(

    registry,

    reference,

    source="",

    line=None,

    column=None

):

    anchor = build_anchor(reference)

    registry.add(

        RegistryItem(

            namespace="bible",

            key=anchor,

            anchor=anchor,

            label=f"{reference.book} {reference.chapter}:{reference.verse}",

            source=source,

            line=line,

            column=column,

            payload=reference

        )

    )

    return anchor
