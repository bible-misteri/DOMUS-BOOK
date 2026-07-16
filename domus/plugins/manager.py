# ----------------------------------
# DOMUS Plugin Manager
# ----------------------------------

class PluginManager:

    def __init__(self):

        self.plugins = []

    # ------------------------------

    def register(self, plugin):

        self.plugins.append(plugin)

        self.plugins.sort(
            key=lambda p: p.priority
        )

    # ------------------------------

    def run(self, context):

        for plugin in self.plugins:

            if plugin.enabled:

                context = plugin.process(context)

        return context
