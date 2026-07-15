# ----------------------------------
# DOMUS Publisher
# ----------------------------------

from domus.citation import CitationEngine


class Publisher:

def __init__(self, database):

    from domus.registry_manager import RegistryManager

    self.registry_manager = RegistryManager()

    self.citation = CitationEngine(database)

def publish(self, markdown):

    result = self.citation.replace(markdown)

for ref in result.references:

    self.registry_manager.register_reference(ref)
