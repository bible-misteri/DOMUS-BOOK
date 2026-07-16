from domus.plugins import Plugin


class HyperlinkPlugin(Plugin):

    name = "hyperlink"

    priority = 10

    def process(self, context):

        return context
