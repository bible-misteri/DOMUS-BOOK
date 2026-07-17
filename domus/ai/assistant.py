from .planner import Planner
from .workflow import Workflow


class DOMUSAssistant:

    def __init__(self, tools):

        self.tools = tools

        self.planner = Planner()

        self.workflow = Workflow()

    def ask(self, instruction):

        plan = self.planner.plan(instruction)

        return self.workflow.execute(
            plan,
            self.tools
        )
