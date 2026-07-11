# ----------------------------------
# DOMUS Bible Utilities
# ----------------------------------

def count_books(metadata):

    return len(
        metadata["books"]
    )


def count_chapters(metadata):

    total = 0

    for book in metadata["books"]:

        total += len(
            book["chapters"]
        )

    return total


def count_verses(metadata):

    total = 0

    for book in metadata["books"]:

        total += sum(
            book["chapters"]
        )

    return total
