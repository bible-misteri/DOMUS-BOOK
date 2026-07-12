# ----------------------------------
# DOMUS Bible Validator
# ----------------------------------

def validate_book(reference, database):

    return reference["book"] in database

def validate_chapter(reference, database):

    book = database[reference["book"]]

    return (
        1 <= reference["chapter"]
        <= len(book["chapters"])
    )

def validate_verse(reference, database):

    if reference["verse"] is None:
        return True

    chapters = database[
        reference["book"]
    ]["chapters"]

    max_verse = chapters[
        reference["chapter"]
    ]

    if reference["verse"] > max_verse:
        return False

    if reference["verse_end"]:

        if reference["verse_end"] > max_verse:
            return False

        if reference["verse_end"] < reference["verse"]:
            return False

    return True

def validate(reference, database):

    if not validate_book(
        reference,
        database
    ):
        return False

    if not validate_chapter(
        reference,
        database
    ):
        return False

    if not validate_verse(
        reference,
        database
    ):
        return False

    return True


# ----------------------------------
# DOMUS Validation
# ----------------------------------

def validate_books(metadata):

    if "books" not in metadata:

        raise Exception(
            "Missing books section."
        )

    if not isinstance(
        metadata["books"],
        list
    ):

        raise Exception(
            "Books must be a list."
        )

    return True
