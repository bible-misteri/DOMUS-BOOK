from .base import BaseService

from domus.render_pipeline import RenderPipeline


class RendererService(BaseService):

    name = "Renderer"

    def __init__(self):

        self.pipeline = RenderPipeline()

    def html(self, text):

        return self.pipeline.render_html(text)

    def latex(self, text):

        return self.pipeline.render_latex(text)

    def epub(self, text):

        return self.pipeline.render_epub(text)

    def docx(self, text):

        return self.pipeline.render_docx(text)
