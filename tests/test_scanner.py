#!/usr/bin/env python3

from domus.scanner import scan

text = """
Yoh 3:16
Mazmur 23
1 Kor 13:4-7
Kejadian 1:1
"""

results = scan(text)

for item in results:
    print(item)
