from domus.publisher import Publisher

database = ...

publisher = Publisher(database)

text = "Yoh 3:16"

result = publisher.publish(text)

assert result == "{{bible:JHN:3:16}}"

print("✓ Publisher")
