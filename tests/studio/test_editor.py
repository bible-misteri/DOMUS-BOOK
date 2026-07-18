from domus.studio.editor.editor import MarkdownEditor

editor = MarkdownEditor()

text = editor.open(
    "books/DOMUS-ISAACI/manuscript/03-chapter-01.md"
)

print(text)

editor.save(
    "books/DOMUS-ISAACI/manuscript/03-chapter-01.md"
)

print("✓ Markdown Editor")
