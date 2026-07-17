from pathlib import Path


class WizardFilesystem:

    def create(self, project):

        root = Path("books") / project

        folders = [

            "manuscript",

            "images",

            "assets",

            "output",

            "logs"

        ]

        root.mkdir(
            parents=True,
            exist_ok=True
        )

        for folder in folders:

            (root / folder).mkdir(
                exist_ok=True
            )

        return root
