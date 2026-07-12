from domus.processor import MarkdownProcessor

database = {

    "Yohanes": {

        "chapters": {

            3:36

        }

    }

}

processor = MarkdownProcessor(database)

results = processor.process(

    "Kasih Allah dalam Yoh 3:16."

)

print(results)
