# ----------------------------------
# DOMUS Reference Scanner
# ----------------------------------

import re


REFERENCE_PATTERN = re.compile(
    r"""
    (?P<book>[1-3]?\s?[A-Za-zÀ-ÿ.]+)
    \s+
    (?P<chapter>\d+)
    (?:
        :
        (?P<verse>\d+)
        (?:
            \s*[-–]\s*
            (?P<verse_end>\d+)
        )?
    )?
    """,
    re.VERBOSE,
)


def scan(text):

    """
    Menghasilkan daftar kandidat referensi Alkitab.

    Scanner tidak melakukan validasi.
    Scanner tidak mengenali alias.
    Scanner hanya menemukan pola.
    """

    references = []

    for match in REFERENCE_PATTERN.finditer(text):

        references.append({

            "raw": match.group(0),

            "book": match.group("book"),

            "chapter": match.group("chapter"),

            "verse": match.group("verse"),

            "verse_end": match.group("verse_end"),

        })

    return references
