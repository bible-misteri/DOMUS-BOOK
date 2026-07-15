# ----------------------------------
# DOMUS Statistics
# ----------------------------------

from collections import Counter


def summarize(registry):

    references = registry.find_by_namespace("bible")

    books = Counter()

    for ref in references:

        books[ref.id] += 1

    return {

        "books": dict(books),

        "total": len(references),

        "unique_books": len(books)

    }
