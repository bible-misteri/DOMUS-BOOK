from domus.ai.reviewer import (
    AIReviewer,
    ReviewRequest
)

reviewer = AIReviewer()

request = ReviewRequest(

    markdown="# Yohanes 3:16"

)

result = reviewer.review(request)

print(result.score)

print("✓ AI Reviewer")
