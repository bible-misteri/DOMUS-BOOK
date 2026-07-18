class HTMLRenderer:

    def render(self, body):

        return f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>DOMUS Preview</title>
</head>
<body>
{body}
</body>
</html>
"""
