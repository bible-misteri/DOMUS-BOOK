from .base import BaseAdapter

class OpenAIAdapter(BaseAdapter):

    name = "OpenAI"

    def generate(self, prompt, **kwargs):
        return {
            "provider": self.name,
            "prompt": prompt
        }

    def chat(self, messages, **kwargs):
        return {
            "provider": self.name,
            "messages": messages
        }

    def embeddings(self, text):
        return []
