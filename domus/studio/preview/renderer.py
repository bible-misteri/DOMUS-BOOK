from .markdown import MarkdownRenderer
from .html import HTMLRenderer

class PreviewRenderer:

    def __init__(self):

        self.markdown = MarkdownRenderer()
        self.html = HTMLRenderer()

    def render(self, text):

        body = self.markdown.render(text)

        return self.html.render(body)
