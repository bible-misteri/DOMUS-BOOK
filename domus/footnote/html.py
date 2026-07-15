from .base import BaseFootnote


class HTMLFootnote(BaseFootnote):

    def render(self, reference):

        return (

            f'<sup>{reference.book} '

            f'{reference.chapter}:{reference.verse}</sup>'

        )
