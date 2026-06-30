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

echo "Current directory:"
pwd

echo
echo "Markdown files:"
ls -1 manuscript

echo
echo "Compiling:"
printf '%s\n' manuscript/*.md

pandoc \
    manuscript/*.md \
    --metadata-file=metadata.yaml \
    --template=../../template/domus-template.tex \
    --resource-path=".:images:../../assets:../../template" \
    --toc \
    --number-sections \
    --pdf-engine-opt=-file-line-error \
    --pdf-engine-opt=-interaction=nonstopmode \
    --pdf-engine=xelatex \
    --standalone \
    -o "output/$NAME.pdf"
    echo
echo "=================================="
echo "Building EPUB..."
echo "=================================="

pandoc \
    manuscript/*.md \
    --metadata-file=metadata.yaml \
    --toc \
    --standalone \
    --resource-path=".:images:../../assets" \
    -o "output/$NAME.epub"

echo
echo "✓ EPUB CREATED SUCCESSFULLY"

echo
echo "=================================="
echo "✓ PDF CREATED SUCCESSFULLY"
echo "=================================="
echo
echo "output/$NAME.pdf"
