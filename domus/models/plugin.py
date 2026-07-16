from dataclasses import dataclass


@dataclass
class PluginResult:

    name: str

    success: bool
