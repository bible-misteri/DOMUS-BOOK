class ActionEngine:

    def insert(self, editor, text):

        editor.buffer.replace(

            editor.buffer.content() + text

        )

    def replace(self, editor, text):

        editor.buffer.replace(text)
