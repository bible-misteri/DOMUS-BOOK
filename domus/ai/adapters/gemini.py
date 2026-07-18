from .base import BaseAdapter

class GeminiAdapter(BaseAdapter):

    name = "Gemini"

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
