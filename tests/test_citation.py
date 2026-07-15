from domus.citation import CitationEngine

database = {

    "Yohanes": {

        "chapters": {

            3: 36

        }

    }

}

engine = CitationEngine(database)

result = engine.replace(

    "Kasih Allah dinyatakan dalam Yoh 3:16."

)

assert result.markdown ==

"Kasih Allah dinyatakan dalam {{bible:JHN:3:16}}."

print("✓ Citation Engine")
