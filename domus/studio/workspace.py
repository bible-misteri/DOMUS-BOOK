# ----------------------------------
# DOMUS Workspace Manager
# ----------------------------------

from pathlib import Path


class WorkspaceManager:

    def __init__(self):

        self.project = None

    def open(self, path):

        self.project = Path(path)

        return self.project

    def close(self):

        self.project = None

    def current(self):

        return self.project

    def is_open(self):

        return self.project is not None
