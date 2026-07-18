class History:

    def __init__(self):

        self.undo_stack = []

        self.redo_stack = []

    def push(self, text):

        self.undo_stack.append(text)

    def undo(self):

        if self.undo_stack:

            return self.undo_stack.pop()

        return None
