from pathlib import Path
import shutil

from .renderer import ReaderRenderer


class LivePreview:

    def __init__(self, workspace):

        self.workspace = Path(workspace)

        self.temp = self.workspace / ".temp"

        self.temp.mkdir(exist_ok=True)

    def build(self):

        renderer = ReaderRenderer(self.workspace)

        html = renderer.build()

        output = self.temp / "preview.html"

        output.write_text(
            html,
            encoding="utf-8"
        )

        self.copy_assets()

        return output

    def copy_assets(self):

        src = (
            Path(__file__).parent
            / "assets"
            / "style.css"
        )

        dst = self.temp / "style.css"

        shutil.copy(src, dst)
