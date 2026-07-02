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
echo "✓ output"

cd "$BOOK"

echo "Current directory:"
pwd

echo
echo "=================================="
echo "DOMUS INSPECTOR"
echo "=================================="

python3 ../../scripts/validate_metadata.py metadata.yaml

echo
echo "✓ Metadata"

python3 ../../scripts/validate_book.py .

echo "✓ Book Structure"

echo
echo "Markdown files:"
ls -1 manuscript

echo
echo "Compiling:"
printf '%s\n' manuscript/*.md

echo
echo "✓ Ready to build."
echo

#========================================
# BUILD LATEX
#========================================

echo
echo "Generating LaTeX source..."

pandoc \
    manuscript/*.md \
    --metadata-file=metadata.yaml \
    --template=../../template/domus-template.tex \
    --resource-path=".:images:../../assets:../../template" \
    --toc \
    --standalone \
    -t latex \
    -o output/debug.tex

#========================================
# BUILD PDF
#========================================

echo
echo "Building PDF..."

pandoc \
    manuscript/*.md \
    --metadata-file=metadata.yaml \
    --template=../../template/domus-template.tex \
    --resource-path=".:images:../../assets:../../template" \
    --toc \
    --number-sections \
    --pdf-engine=xelatex \
    --standalone \
    -s \
    -o output/$NAME.pdf \
    --verbose \
    2> output/pandoc.log

#========================================
# BUILD EPUB
#========================================

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
echo "DOMUS BUILD SUMMARY"
echo "=================================="

echo "Book      : $NAME"

PDFSIZE=$(du -h "output/$NAME.pdf" | cut -f1)
EPUBSIZE=$(du -h "output/$NAME.epub" | cut -f1)

echo "PDF       : $PDFSIZE"
echo "EPUB      : $EPUBSIZE"

echo
echo "Artifacts"

echo "✓ output/$NAME.pdf"
echo "✓ output/$NAME.epub"

echo
echo "BUILD FINISHED SUCCESSFULLY"
