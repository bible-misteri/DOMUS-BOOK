provider = BibliographyProvider(
    "data/bibliography.json"
)

engine = BibliographyEngine(provider)

book = engine.find("beale2012")

assert book is not None

print(book)

print("✓ Bibliography")
