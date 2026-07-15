from domus.filters.bible_filter import extract

text = """

Kasih Allah {{bible:JHN:3:16}}

Kejadian {{bible:GEN:1:1}}

"""

items = extract(text)

assert len(items) == 2

assert items[0] == "JHN:3:16"

assert items[1] == "GEN:1:1"

print("✓ Filter Extract")
