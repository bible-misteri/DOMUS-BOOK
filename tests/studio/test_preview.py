from domus.studio.preview.preview import LivePreview

preview = LivePreview()

html = preview.update("""

# DOMUS ISAACI

Kasih Allah dinyatakan dalam **Yohanes 3:16**.

""")

print(html)

print("✓ Live Preview")
