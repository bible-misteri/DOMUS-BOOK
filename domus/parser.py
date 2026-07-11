# ----------------------------------
# DOMUS Reference Parser
# ----------------------------------

def parse(reference):

    """
    Mengubah hasil scanner
    menjadi object parser.
    """

    return {

        "raw": reference["raw"],

        "book": reference["book"].strip(),

        "chapter": int(reference["chapter"]),

        "verse":
            int(reference["verse"])
            if reference["verse"]
            else None,

        "verse_end":
            int(reference["verse_end"])
            if reference["verse_end"]
            else None,

        "type": detect_type(reference)

  }

# ----------------------------------
# Detect Reference Type
# ----------------------------------

def detect_type(reference):

    if reference["verse"] is None:

        return "chapter"

    if reference["verse_end"] is None:

        return "single"

    return "range"
