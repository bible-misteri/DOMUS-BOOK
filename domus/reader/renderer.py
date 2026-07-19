from pathlib import Path

from .builder import ReaderBuilder

from .html import HTMLDocument


class ReaderRenderer:

    def __init__(self, workspace):

        self.workspace = Path(workspace)

    def build(self):

        builder = ReaderBuilder(
            self.workspace
        )

        data = builder.build()

        doc = HTMLDocument(
            "DOMUS Reader"
        )

        doc.add("<h1>DOMUS ISAACI</h1>")

        doc.add("<h2>Thesis</h2>")
        doc.add(
            f"<pre>{data['thesis']}</pre>"
        )

        doc.add("<h2>Questions</h2>")
        doc.add(
            f"<pre>{data['questions']}</pre>"
        )

        doc.add("<h2>Outline</h2>")
        doc.add(
            f"<pre>{data['outline']}</pre>"
        )

        return doc.render()
