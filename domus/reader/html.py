from pathlib import Path


class HTMLDocument:

    def __init__(self, title):

        self.title = title

        self.body = []

    def add(self, html):

        self.body.append(html)

    def render(self):

        body = "\n".join(self.body)

        return f"""<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">

<title>{self.title}</title>

<link rel="stylesheet" href="style.css">

</head>

<body>

{body}

</body>

</html>
"""
