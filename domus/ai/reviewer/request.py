from dataclasses import dataclass

@dataclass
class ReviewRequest:

    markdown: str

    strict: bool = True

    check_bible = True

    check_glossary = True

    check_crossrefs = True

    check_bibliography = True

    check_headings = True

    check_markdown = True
