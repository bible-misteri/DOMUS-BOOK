from domus.ai.adapters import (
    AdapterManager,
    OpenAIAdapter
)

adapter = AdapterManager(
    OpenAIAdapter()
)

result = adapter.generate(
    "Yohanes 3:16"
)

assert result["provider"] == "OpenAI"

print("✓ AI Adapter")
