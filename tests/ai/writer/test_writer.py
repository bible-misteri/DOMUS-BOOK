from domus.ai.writer.writer import AIWriter
from domus.ai.writer.request import WriterRequest

writer = AIWriter()

request = WriterRequest(

    title="DOMUS ISAACI",

    topic="Esau sebagai Bayangan Kristus"

)

result = writer.write(request)

print(result)

print("✓ AI Writer")
