# ----------------------------------
# DOMUS Scripture Appendix
# ----------------------------------

from domus.indexer import build_index


def build_appendix(references):

    index = build_index(references)

    lines = []

    lines.append("# REFERENSI ALKITAB")
    lines.append("")

    for book in sorted(index.keys()):

        lines.append(f"## {book}")
        lines.append("")

        for verse in sorted(index[book]):

            lines.append(f"- {verse}")

        lines.append("")

    return "\n".join(lines)
