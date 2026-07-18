from dataclasses import dataclass

@dataclass
class EvidenceRequest:

    markdown: str

    strict: bool = True
