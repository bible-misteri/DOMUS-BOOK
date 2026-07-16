from domus.glossary.provider import GlossaryProvider
from domus.glossary.engine import GlossaryEngine

provider = GlossaryProvider(
    "data/glossary.json"
)

engine = GlossaryEngine(provider)

item = engine.find("Yahweh")

assert item is not None

print(item)

print("✓ Glossary")
