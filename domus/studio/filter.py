class ExplorerFilter:

    DEFAULT = {

        ".git",

        "__pycache__",

        ".pytest_cache"

    }

    def visible(self, name):

        return name not in self.DEFAULT
