# ----------------------------------
# DOMUS Bible Index
# ----------------------------------

from collections import defaultdict


def build_index(registry):

    references = registry.find_by_namespace("bible")

    index = defaultdict(list)

    for ref in references:

        verse = str(ref.chapter)

        if ref.verse is not None:

            verse += f":{ref.verse}"

            if ref.verse_end:

                verse += f"-{ref.verse_end}"

        index[ref.book].append(verse)

    return dict(index)
