from pathlib import Path


class ReaderBuilder:

    def __init__(self, workspace):

        self.workspace = Path(workspace)

    def load(self, filename):

        file = self.workspace / filename

        if not file.exists():
            return ""

        return file.read_text(
            encoding="utf-8"
        )

    def build(self):

        return {

            "thesis":
                self.load("thesis.md"),

            "questions":
                self.load("questions.md"),

            "outline":
                self.load("outline.md"),

        }
