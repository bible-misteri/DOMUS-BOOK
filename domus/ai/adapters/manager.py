class AdapterManager:

    def __init__(self, adapter):
        self.adapter = adapter

    def generate(self, prompt, **kwargs):
        return self.adapter.generate(prompt, **kwargs)

    def chat(self, messages, **kwargs):
        return self.adapter.chat(messages, **kwargs)
