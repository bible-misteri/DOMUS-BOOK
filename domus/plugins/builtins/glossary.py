from domus.plugins import Plugin


class GlossaryPlugin(Plugin):

    name = "glossary"

    priority = 40

    def process(self, context):

        return context
