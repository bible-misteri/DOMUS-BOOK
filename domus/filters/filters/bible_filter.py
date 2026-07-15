# ----------------------------------
# DOMUS Bible Filter
# ----------------------------------

import re


PATTERN = re.compile(

    r"\{\{bible:(.*?)\}\}"

)


def extract(markdown):

    """
    Mengambil seluruh
    DIM dari markdown.
    """

    return PATTERN.findall(markdown)
