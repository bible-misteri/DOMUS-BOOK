from .conversation import Conversation
from .context import ProjectContext


class AIChatPanel:

    def __init__(self, assistant):

        self.assistant = assistant

        self.context = ProjectContext()

        self.conversation = Conversation()

    def ask(self, prompt):

        self.conversation.add(

            "user",

            prompt

        )

        response = self.assistant.chat(

            prompt

        )

        self.conversation.add(

            "assistant",

            response

        )

        return response
