# ----------------------------------
# DOMUS Build Pipeline
# ----------------------------------

from pathlib import Path


class BuildPipeline:

    def __init__(self, publisher):

        self.publisher = publisher

    def build(self, manuscript):

        text = Path(manuscript).read_text(
            encoding="utf-8"
        )

        return self.publisher.publish(text)
