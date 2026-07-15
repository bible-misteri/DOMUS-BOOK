from domus.footnote import FootnoteEngine

engine = FootnoteEngine()

result = engine.latex.render(ref)

print(result)
