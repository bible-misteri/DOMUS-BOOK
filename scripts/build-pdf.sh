#!/bin/bash

set -e

BOOK="$1"

if [ -z "$BOOK" ]; then
    echo "Usage: build-pdf.sh <book-folder>"
    exit 1
fi

NAME=$(basename "$BOOK")

echo "=================================="
echo "Building PDF : $NAME"
echo "=================================="

mkdir -p "$BOOK/output"

pandoc \
    "$BOOK"/manuscript/*.md \
    --metadata-file="$BOOK/metadata.yaml" \
    --template=template/domus-template.tex \
    --resource-path="$BOOK:$BOOK/images:template:assets" \
    --toc \
    --number-sections \
    --pdf-engine=xelatex \
    --standalone \
    -o "$BOOK/output/$NAME.pdf"

echo
echo "=================================="
echo "✓ PDF CREATED SUCCESSFULLY"
echo "=================================="
echo
echo "$BOOK/output/$NAME.pdf"
