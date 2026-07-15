from domus.renderer.epub import EPUBRenderer

renderer = EPUBRenderer()

text = "{{link:bible-jhn-3-16|Yohanes 3:16}}"

result = renderer.render(text)

assert result == '<a href="#bible-jhn-3-16">Yohanes 3:16</a>'

print("✓ EPUB Renderer")
