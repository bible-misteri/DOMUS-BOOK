# ----------------------------------
# DOMUS Publisher
# Version : 2.0.0
# ----------------------------------

from domus.citation import CitationEngine
from domus.registry_manager import RegistryManager
from domus.statistics import summarize
from domus.appendix import build_appendix
from domus.hyperlink import HyperlinkEngine


class Publisher:

    def __init__(self, database):

        self.registry_manager = RegistryManager()

        self.citation = CitationEngine(database)

        self.hyperlink = HyperlinkEngine(
            self.registry_manager.get_registry()
        )

    # ----------------------------------

    def publish(self, markdown):

        # Citation Engine
        result = self.citation.replace(markdown)

        # Registry
        for ref in result.references:

            self.registry_manager.register_reference(ref)

        registry = self.registry_manager.get_registry()

        hyperlinks = []

        for ref in result.references:

        hyperlinks.append(

            self.hyperlink.hyperlink(ref)

        )

        # Statistics
        statistics = summarize(registry)

        # Scripture Appendix
        appendix = build_appendix(registry)

        return {

            "markdown": result.markdown,

            "references": result.references,

            "registry": registry,

            "statistics": statistics,

            "appendix": appendix

            "hyperlinks": hyperlinks

        }
