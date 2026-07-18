from .base import BaseAgent

from domus.ai.response import AIResponse


class ReviewerAgent(BaseAgent):

    name = "Reviewer"

    def execute(self, request):

        return AIResponse(

            success=True,

            message="Review completed.",

            payload=request

        )
