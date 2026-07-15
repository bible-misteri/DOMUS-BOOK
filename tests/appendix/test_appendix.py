from domus.appendix import build_appendix
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
        id="JHN",
        book="Yohanes",
        chapter=3,
        verse=16,
        verse_end=None,
        type="single"
    )

]

appendix = build_appendix(refs)

assert "# REFERENSI ALKITAB" in appendix
assert "## Kejadian" in appendix
assert "- 1:1" in appendix
assert "## Yohanes" in appendix
assert "- 3:16" in appendix

print("✓ Scripture Appendix")
