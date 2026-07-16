from domus.plugins import Plugin


class BibliographyPlugin(Plugin):

    name = "bibliography"

    priority = 50

    def process(self, context):

        return context
