from .base import BaseService

from domus.registry_manager import RegistryManager


class RegistryService(BaseService):

    name = "Registry"

    def __init__(self):

        self.manager = RegistryManager()

    def registry(self):

        return self.manager.get_registry()
