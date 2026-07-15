# ----------------------------------
# DOMUS Hyperlink Engine
# Version : 1.0.0
# ----------------------------------


class HyperlinkEngine:

    def __init__(self, registry):

        self.registry = registry

    # ----------------------------------

    def build(self, reference):

        anchor = f"bible-{reference.id.lower()}-{reference.chapter}"

        if reference.verse is not None:

            anchor += f"-{reference.verse}"

            if reference.verse_end:

                anchor += f"-{reference.verse_end}"

        return anchor
      
      # -------------------------------

      def hyperlink(self, reference):

        anchor = self.build(reference)

        return (

            f"{{{{link:{anchor}|"

            f"{reference.book} "

            f"{reference.chapter}:{reference.verse}"

            f"}}}}"

              )
      
