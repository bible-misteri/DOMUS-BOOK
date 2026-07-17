from pathlib import Path


class TemplateBuilder:

    def create(self, root):

        files = [

            "00-cover.md",

            "01-preface.md",

            "02-introduction.md",

            "03-chapter-01.md"

        ]

        manuscript = root / "manuscript"

        for file in files:

            (manuscript / file).touch()
