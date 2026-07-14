from domus.models import BibleReference
from domus.markup import build

ref = BibleReference(

    id="JHN",

    book="Yohanes",

    chapter=3,

    verse=16,

    verse_end=None,

    type="single"

)

assert build(ref) == "{{bible:JHN:3:16}}"

print("✓ Markup")
