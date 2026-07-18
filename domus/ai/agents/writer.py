from .base import BaseAgent

from domus.ai.response import AIResponse


class WriterAgent(BaseAgent):

    name = "Writer"

    def execute(self, request):

        return AIResponse(

            success=True,

            message="Writer executed.",

            payload=request

        )
