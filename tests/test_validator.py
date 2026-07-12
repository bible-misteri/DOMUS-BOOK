from domus.validation import validate

database = {

    "Yohanes": {

        "chapters": {

            1: 51,

            2: 25,

            3: 36

        }

    }

}

assert validate(

    {

        "book": "Yohanes",

        "chapter": 3,

        "verse": 16,

        "verse_end": None

    },

    database

)

print("✓ Validator")

assert not validate(

    {

        "book": "Yohanes",

        "chapter": 99,

        "verse": 1,

        "verse_end": None

    },

    database

)

assert not validate(

    {

        "book": "Yohanes",

        "chapter": 3,

        "verse": 99,

        "verse_end": None

    },

    database

)
