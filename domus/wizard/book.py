from .base import BaseWizard
from .filesystem import WizardFilesystem
from .metadata import MetadataWriter
from .templates import TemplateBuilder
from .result import WizardResult


class BookWizard(BaseWizard):

    name = "Book Wizard"

    def run(self, metadata):

        fs = WizardFilesystem()

        root = fs.create(

            metadata["project"]

        )

        MetadataWriter().write(

            root / "metadata.yaml",

            metadata

        )

        TemplateBuilder().create(root)

        return WizardResult(

            success=True,

            message="Project created.",

            project_path=str(root)

        )
