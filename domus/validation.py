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
