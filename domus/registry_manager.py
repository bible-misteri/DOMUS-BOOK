# ----------------------------------
# DOMUS Registry Manager
# Version : 2.0.0
# ----------------------------------

from domus.registry import (
    Registry,
    register_reference
)


class RegistryManager:

    def __init__(self):

        self.registry = Registry()

    # ----------------------------------

    def register_reference(
        self,
        reference,
        source="",
        line=None,
        column=None
    ):

        return register_reference(
            self.registry,
            reference,
            source,
            line,
            column
        )

    # ----------------------------------

    def register_figure(self, figure):

        # Reserved for future version
        pass

    # ----------------------------------

    def register_table(self, table):

        # Reserved for future version
        pass

    # ----------------------------------

    def clear(self):

        self.registry.clear()

    # ----------------------------------

    def count(self):

        return self.registry.count()

    # ----------------------------------

    def get_registry(self):

        return self.registry
