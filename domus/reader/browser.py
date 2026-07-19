import webbrowser


class Browser:

    @staticmethod
    def open(file):

        webbrowser.open(file.as_uri())
