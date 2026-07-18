from .base import BaseAgent

from domus.ai.response import AIResponse


class PublisherAgent(BaseAgent):

    name = "Publisher"

    def execute(self, request):

        return AIResponse(

            success=True,

            message="Publishing completed.",

            payload=request

        )
