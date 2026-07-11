from domus.scanner import scan
from domus.parser import parse

text = """
Yoh 3:16
Mazmur 23
1 Kor 13:4-7
"""

for item in scan(text):
    print(parse(item))
