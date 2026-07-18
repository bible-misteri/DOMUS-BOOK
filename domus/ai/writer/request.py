from dataclasses import dataclass

@dataclass
class WriterRequest:

    title: str

    topic: str

    audience: str = "general"

    language: str = "id"

    style: str = "theology"

    chapter: str = ""
