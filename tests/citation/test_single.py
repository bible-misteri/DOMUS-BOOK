from domus.citation import CitationEngine

database = ...

engine = CitationEngine(database)

text = "Yoh 3:16"

result = engine.replace(text)

assert "{{bible:JHN:3:16}}" in result.markdown

print("✓ Citation Single")
