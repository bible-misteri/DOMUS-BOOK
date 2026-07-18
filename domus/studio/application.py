from .workspace import WorkspaceManager


class StudioApplication:

    def __init__(self):

        self.workspace = WorkspaceManager()

    def start(self):

        print("DOMUS Studio started.")

    def stop(self):

        print("DOMUS Studio closed.")
