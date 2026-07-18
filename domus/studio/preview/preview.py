from .renderer import PreviewRenderer

class LivePreview:

    def __init__(self):

        self.renderer = PreviewRenderer()

    def update(self, markdown):

        return self.renderer.render(markdown)
