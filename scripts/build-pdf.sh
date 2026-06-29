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

cd "$BOOK"

pandoc \
    manuscript/*.md \
    --metadata-file=metadata.yaml \
    --template=../../template/domus-template.tex \
    --resource-path=".:images:../../assets:../../template" \
    --toc \
    --number-sections \
    --pdf-engine=xelatex \
    --standalone \
    -o "output/$NAME.pdf"

echo
echo "=================================="
echo "✓ PDF CREATED SUCCESSFULLY"
echo "=================================="
echo
echo "$BOOK/output/$NAME.pdf"
