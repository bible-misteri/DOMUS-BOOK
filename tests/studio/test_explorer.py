from domus.studio.explorer import ProjectExplorer

explorer = ProjectExplorer()

items = explorer.load("books/DOMUS-ISAACI")

for item in items:

    print(item["icon"], item["name"])

print("✓ Project Explorer")
