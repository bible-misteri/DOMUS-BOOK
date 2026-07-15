from domus.citation import CitationEngine

database = ...

engine = CitationEngine(database)

text = "Yoh 99:1"

result = engine.replace(text)

assert len(result.references) == 1
assert result.references[0].valid is False

print("✓ Citation Invalid")
