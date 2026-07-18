class WriterExporter:

    def export(

        self,

        markdown,

        editor

    ):

        editor.buffer.replace(

            markdown

        )
