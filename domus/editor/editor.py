from pathlib import Path

from .buffer import TextBuffer
from .cursor import Cursor
from .selection import Selection
from .history import History


class MarkdownEditor:

    def __init__(self):

        self.buffer = TextBuffer()

        self.cursor = Cursor()

        self.selection = Selection()

        self.history = History()

    def open(self, path):

        text = Path(path).read_text(
            encoding="utf-8"
        )

        self.buffer.load(text)

        return self.buffer.content()

    def save(self, path):

        Path(path).write_text(

            self.buffer.content(),

            encoding="utf-8"

        )
