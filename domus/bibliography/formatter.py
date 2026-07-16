class BibliographyFormatter:

    def format(self, item):

        if item is None:

            return ""

        return (

            f"{item['author']}. "

            f"{item['title']}. "

            f"{item['publisher']}, "

            f"{item['year']}."

        )
