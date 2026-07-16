class GlossaryRenderer:

    def render(self, item):

        if item is None:
            return ""

        return (
            f"{item['title']}: "
            f"{item['description']}"
        )
