# ----------------------------------
# DOMUS Bible Engine
# Version : 1.0.0
# Status  : Stable
# ----------------------------------

from domus.scanner import scan
from domus.parser import parse
from domus.resolver import (
    load_aliases,
    resolve
)
from domus.validation import validate


class BibleEngine:

    def __init__(self, database):

        self.database = database

        self.aliases = load_aliases()

    def parse_text(self, text):

        references = []

        for item in scan(text):

            ref = parse(item)

            ref = resolve(
                ref,
                self.aliases
            )

            ref["valid"] = validate(
                ref,
                self.database
            )

            references.append(ref)

        return references
