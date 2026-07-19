import time


class FileWatcher:

    def watch(self, callback):

        while True:

            callback()

            time.sleep(2)
