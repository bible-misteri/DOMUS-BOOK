from .base import BaseService

from domus.engine import BibleEngine


class BibleService(BaseService):

    name = "Bible"

    def __init__(self, database):

        self.engine = BibleEngine(database)

    def parse(self, text):

        return self.engine.parse_text(text)
