import re

from .base import BaseRenderer


class LaTeXRenderer(BaseRenderer):

    pattern = re.compile(
        r"\{\{link:([^|]+)\|([^}]+)\}\}"
    )

    def render(self, text):

        def replace(match):

            anchor = match.group(1)

            label = match.group(2)

            return (
                rf"\hyperlink{{{anchor}}}{{{label}}}"
            )

        return self.pattern.sub(
            replace,
            text
        )
