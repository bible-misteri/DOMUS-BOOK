from domus.models import BibleReference

def john_316():

    return BibleReference(
        id="JHN",
        book="Yohanes",
        chapter=3,
        verse=16,
        verse_end=None,
        type="single",
        valid=True
    )
