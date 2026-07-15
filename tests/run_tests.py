#!/usr/bin/env python3

print("==================================")
print("DOMUS Test Runner")
print("==================================")
print()

import test_scanner
import test_parser
import test_resolver
import test_validator
import test_engine
import test_processor
import test_publisher
import test_summary

print()
print("==================================")
print("All DOMUS tests passed.")
print("==================================")

from domus.filters.bible_filter import extract

text = """

Kasih Allah {{bible:JHN:3:16}}

Kejadian {{bible:GEN:1:1}}

"""

items = extract(text)

assert len(items) == 2

assert items[0] == "JHN:3:16"

assert items[1] == "GEN:1:1"

print("✓ Filter Extract")
