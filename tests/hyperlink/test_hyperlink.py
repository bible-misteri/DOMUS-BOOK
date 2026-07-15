from domus.hyperlink import HyperlinkEngine

engine = HyperlinkEngine(None)

anchor = engine.build(ref)

assert anchor == "bible-jhn-3-16"

print("✓ Hyperlink")
