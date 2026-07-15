from domus.indexer import build_index

from domus.models import BibleReference

refs = [

    BibleReference(
        id="GEN",
        book="Kejadian",
        chapter=1,
        verse=1,
        verse_end=None,
        type="single"
    ),

    BibleReference(
        id="GEN",
        book="Kejadian",
        chapter=1,
        verse=2,
        verse_end=None,
        type="single"
    ),

    BibleReference(
        id="JHN",
        book="Yohanes",
        chapter=3,
        verse=16,
        verse_end=None,
        type="single"
    )

]

index = build_index(refs)

assert len(index["Kejadian"]) == 2

assert len(index["Yohanes"]) == 1

print("✓ Bible Index")
