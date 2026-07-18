class DraftBuilder:

    def build(

        self,

        outline

    ):

        markdown = ""

        for section in outline:

            markdown += f"# {section}\n\n"

        return markdown
