from domus.resolver import (
    load_aliases,
    resolve
)

aliases = load_aliases()

reference = {
    "book": "Yoh"
}

result = resolve(
    reference,
    aliases
)

assert result["book"] == "Yohanes"

print("✓ Resolver")
