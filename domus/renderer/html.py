import re

from .base import BaseRenderer


class HTMLRenderer(BaseRenderer):

    pattern = re.compile(
        r"\{\{link:([^|]+)\|([^}]+)\}\}"
    )

    def render(self, text):

        def replace(match):

            anchor = match.group(1)

            label = match.group(2)

            return (
                f'<a href="#{anchor}">{label}</a>'
            )

        return self.pattern.sub(
            replace,
            text
        )
