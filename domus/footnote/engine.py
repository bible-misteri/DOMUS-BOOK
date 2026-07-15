# ----------------------------------
# DOMUS Smart Footnote Engine
# Version : 1.0.0
# ----------------------------------

from .latex import LaTeXFootnote
from .html import HTMLFootnote
from .epub import EPUBFootnote
from .docx import DOCXFootnote


class FootnoteEngine:

    def __init__(self):

        self.latex = LaTeXFootnote()

        self.html = HTMLFootnote()

        self.epub = EPUBFootnote()

        self.docx = DOCXFootnote()
