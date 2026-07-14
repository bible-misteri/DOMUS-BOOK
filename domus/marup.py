# ----------------------------------
# DOMUS Internal Markup (DIM)
# ----------------------------------

def build(reference):

    """
    Mengubah BibleReference
    menjadi DOMUS Internal Markup.
    """

    if reference.verse is None:

        return (
            f"{{{{bible:{reference.id}:{reference.chapter}}}}}"
        )

    if reference.verse_end:

        return (
            f"{{{{bible:{reference.id}:{reference.chapter}:{reference.verse}-{reference.verse_end}}}}}"
        )

    return (
        f"{{{{bible:{reference.id}:{reference.chapter}:{reference.verse}}}}}"
  )
