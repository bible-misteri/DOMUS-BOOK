import markdown

class MarkdownRenderer:

    def render(self, text):

        return markdown.markdown(
            text,
            extensions=[
                "tables",
                "fenced_code"
            ]
        )
