from dataclasses import dataclass


@dataclass
class AIResponse:

    success: bool

    message: str

    payload: object = None
