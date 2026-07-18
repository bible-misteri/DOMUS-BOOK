from .base import BaseAgent

from domus.ai.response import AIResponse


class EditorAgent(BaseAgent):

    name = "Editor"

    def execute(self, request):

        return AIResponse(

            success=True,

            message="Editing completed.",

            payload=request

        )
