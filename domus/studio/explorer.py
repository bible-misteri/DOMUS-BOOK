from .tree import ProjectTree
from .filters import ExplorerFilter
from .icons import ExplorerIcons


class ProjectExplorer:

    def __init__(self):

        self.tree = ProjectTree()

        self.filter = ExplorerFilter()

        self.icons = ExplorerIcons()

    def load(self, root):

        result = []

        for node in self.tree.build(root):

            if self.filter.visible(node.name):

                result.append({

                    "icon": self.icons.icon(node),

                    "name": node.name,

                    "path": str(node.path)

                })

        return result
