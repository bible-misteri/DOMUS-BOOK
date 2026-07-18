from domus.studio import StudioApplication

app = StudioApplication()

app.start()

workspace = app.workspace

workspace.open("books/DOMUS-ISAACI")

assert workspace.is_open()

print(workspace.current())

workspace.close()

assert not workspace.is_open()

print("✓ Workspace Manager")
