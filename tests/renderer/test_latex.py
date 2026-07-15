from domus.renderer.latex import LaTeXRenderer

renderer = LaTeXRenderer()

text = "{{link:bible-jhn-3-16|Yohanes 3:16}}"

result = renderer.render(text)

assert result == r'\hyperlink{bible-jhn-3-16}{Yohanes 3:16}'

print("✓ LaTeX Renderer")
