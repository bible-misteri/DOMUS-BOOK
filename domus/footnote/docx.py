from .base import BaseFootnote


class DOCXFootnote(BaseFootnote):

    def render(self, reference):

        return (
            f"{reference.book} "
            f"{reference.chapter}:{reference.verse}"
        )
