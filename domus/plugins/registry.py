# ----------------------------------
# DOMUS Plugin Registry
# ----------------------------------

class PluginRegistry:

    def __init__(self):

        self.plugins = {}

    def add(self, plugin):

        self.plugins[plugin.name] = plugin

    def get(self, name):

        return self.plugins.get(name)

    def all(self):

        return list(self.plugins.values())
