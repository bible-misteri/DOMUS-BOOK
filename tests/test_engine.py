from domus.engine import BibleEngine

database = {

    "Yohanes": {

        "chapters": {

            1: 51,
            2: 25,
            3: 36

        }

    }

}

engine = BibleEngine(database)

results = engine.parse_text(

    "Yoh 3:16"

)

print(results)

[
    {
        "raw":"Yoh 3:16",
        "book":"Yohanes",
        "chapter":3,
        "verse":16,
        "verse_end":None,
        "type":"single",
        "valid":True
    }
]
