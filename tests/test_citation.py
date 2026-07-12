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

assert "markdown" in result
assert "references" in result

print("✓ Citation Engine")
