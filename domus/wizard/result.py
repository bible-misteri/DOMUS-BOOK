from dataclasses import dataclass

@dataclass
class WizardResult:

    success: bool

    message: str

    project_path: str = ""
