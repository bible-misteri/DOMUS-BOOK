from pathlib import Path
from .nodes import ExplorerNode


class ProjectTree:

    def build(self, root):

        nodes = []

        root = Path(root)

        for item in sorted(root.iterdir()):

            nodes.append(

                ExplorerNode(

                    name=item.name,

                    path=item,

                    is_directory=item.is_dir()

                )

            )

        return nodes
