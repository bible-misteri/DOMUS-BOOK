from domus.wizard import BookWizard

wizard = BookWizard()

result = wizard.run({

    "project": "DOMUS-ISAACI",

    "title": "DOMUS ISAACI",

    "author": "Norman Sandhi",

    "language": "id",

    "theme": "theology"

})

assert result.success

print(result)

print("✓ Book Wizard")
