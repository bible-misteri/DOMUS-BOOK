# ----------------------------------
# DOMUS Render Pipeline
# Version : 1.0.0
# ----------------------------------

from domus.renderer import (
    HTMLRenderer,
    LaTeXRenderer,
    EPUBRenderer,
    DOCXRenderer
)


class RenderPipeline:

    def __init__(self):

        self.html = HTMLRenderer()

        self.latex = LaTeXRenderer()

        self.epub = EPUBRenderer()

        self.docx = DOCXRenderer()

    # ----------------------------------

    def render_html(self, text):

        return self.html.render(text)

    # ----------------------------------

    def render_latex(self, text):

        return self.latex.render(text)

    # ----------------------------------

    def render_epub(self, text):

        return self.epub.render(text)

    # ----------------------------------

    def render_docx(self, text):

        return self.docx.render(text)
