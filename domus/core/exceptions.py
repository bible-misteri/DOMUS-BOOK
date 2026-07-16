# ----------------------------------
# DOMUS Exceptions
# ----------------------------------

class DomusError(Exception):
    pass


class ValidationError(DomusError):
    pass


class RegistryError(DomusError):
    pass


class PluginError(DomusError):
    pass


class RendererError(DomusError):
    pass
