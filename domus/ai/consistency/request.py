from dataclasses import dataclass

@dataclass
class ConsistencyRequest:

    project_path: str

    chapter: str = ""

    strict: bool = True
