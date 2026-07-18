from domus.services import PublisherService


class BuildCommand:

    def __init__(

        self,

        publisher

    ):

        self.publisher = publisher

    def run(

        self,

        markdown

    ):

        return self.publisher.publish(

            markdown

        )
