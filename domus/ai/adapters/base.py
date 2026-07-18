# ----------------------------------
# DOMUS AI Base Adapter
# ----------------------------------

class BaseAdapter:

    name = "Adapter"

    version = "1.0.0"

    def generate(self, prompt, **kwargs):
        raise NotImplementedError

    def chat(self, messages, **kwargs):
        raise NotImplementedError

    def embeddings(self, text):
        raise NotImplementedError
