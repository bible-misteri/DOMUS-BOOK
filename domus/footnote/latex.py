from .base import BaseFootnote


class LaTeXFootnote(BaseFootnote):

    def render(self, reference):

        return (
            rf"\footnote{{{reference.book} "
            rf"{reference.chapter}:{reference.verse}}}"
        )
