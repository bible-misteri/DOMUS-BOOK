class TextBuffer:

    def __init__(self):

        self.text = ""

    def load(self, text):

        self.text = text

    def content(self):

        return self.text

    def replace(self, text):

        self.text = text
