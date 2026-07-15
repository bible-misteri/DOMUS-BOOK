from domus.registry import (
    Registry,
    build_anchor,
    register_reference
)

from domus.models import BibleReference

registry = Registry()

ref = BibleReference(

    id="JHN",

    book="Yohanes",

    chapter=3,

    verse=16,

    verse_end=None,

    type="single"

)

anchor = register_reference(

    registry,

    ref

)

assert anchor == "bible-jhn-3-16"

assert registry.exists(anchor)

print("✓ Registry")
