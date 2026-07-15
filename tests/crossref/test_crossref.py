from pathlib import Path

from domus.crossref.provider import CrossReferenceProvider
from domus.crossref.engine import CrossReferenceEngine
from domus.models import BibleReference

# Lokasi dataset
provider = CrossReferenceProvider(
    Path("data/cross_references.json")
)

engine = CrossReferenceEngine(provider)

# Contoh referensi
ref = BibleReference(
    id="JHN",
    book="Yohanes",
    chapter=3,
    verse=16,
    verse_end=None,
    type="single",
    valid=True
)

result = engine.find(ref)

print(result)

assert len(result) > 0

print("✓ Cross Reference")
