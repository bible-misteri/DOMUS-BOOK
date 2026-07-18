class ExplorerIcons:

    ICONS = {

        ".md": "📄",

        ".yaml": "⚙️",

        ".json": "🗂",

        ".png": "🖼",

        ".jpg": "🖼"

    }

    FOLDER = "📁"

    DEFAULT = "📦"

    def icon(self, node):

        if node.is_directory:

            return self.FOLDER

        return self.ICONS.get(

            node.path.suffix,

            self.DEFAULT

        )
