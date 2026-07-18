from domus.ai.researcher import (
    AIResearcher,
    ResearchRequest
)

researcher = AIResearcher()

request = ResearchRequest(

    query="Kasih Allah"

)

result = researcher.research(request)

print(result.summary)

print("✓ AI Researcher")
