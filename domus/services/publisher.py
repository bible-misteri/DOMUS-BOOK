from .base import BaseService

from domus.publisher import Publisher


class PublisherService(BaseService):

    name = "Publisher"

    def __init__(self, database):

        self.publisher = Publisher(database)

    def publish(self, markdown):

        return self.publisher.publish(markdown)
