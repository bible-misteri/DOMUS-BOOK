from domus.statistics import summarize
from domus.models import BibleReference

refs = [

    BibleReference(
        id="JHN",
        book="Yohanes",
        chapter=3,
        verse=16,
        verse_end=None,
        type="single"
    ),

    BibleReference(
        id="JHN",
        book="Yohanes",
        chapter=3,
        verse=17,
        verse_end=None,
        type="single"
    ),

    BibleReference(
        id="GEN",
        book="Kejadian",
        chapter=1,
        verse=1,
        verse_end=None,
        type="single"
    )

]

summary = summarize(refs)

assert summary["books"]["JHN"] == 2
assert summary["books"]["GEN"] == 1
assert summary["total"] == 3
assert summary["unique_books"] == 2

print("✓ Statistics")
