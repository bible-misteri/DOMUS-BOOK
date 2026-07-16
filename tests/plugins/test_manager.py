from domus.plugins import PluginManager
from domus.plugins.builtins.hyperlink import HyperlinkPlugin

manager = PluginManager()

manager.register(HyperlinkPlugin())

assert len(manager.plugins) == 1

print("✓ Plugin Manager")
