#!/bin/bash

set -e

echo "=================================="
echo " DOMUS Publisher v9.0"
echo "=================================="
echo

mkdir -p output

echo "Scanning books..."

for BOOK in books/DOMUS-Book-*; do
    [ -d "$BOOK" ] || continue

    NAME=$(basename "$BOOK")

    echo
    echo "----------------------------------"
    echo "Found: $NAME"
    echo "----------------------------------"

    ls -1 "$BOOK"
done

echo
echo "Scan completed."
