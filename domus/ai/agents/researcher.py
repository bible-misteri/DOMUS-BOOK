from .base import BaseAgent

from domus.ai.response import AIResponse


class ResearcherAgent(BaseAgent):

    name = "Researcher"

    def execute(self, request):

        return AIResponse(

            success=True,

            message="Research completed.",

            payload=request

        )
