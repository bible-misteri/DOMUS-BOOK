from domus.build import BuildPipeline
from domus.publisher import Publisher

publisher = Publisher(database)

pipeline = BuildPipeline(publisher)

print("✓ Build Pipeline")
