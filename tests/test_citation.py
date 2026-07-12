from domus.citation import CitationEngine

database = {}

engine = CitationEngine(database)

text = "Yoh 3:16"

result = engine.replace(text)

assert result == text

print("✓ Citation Engine")
