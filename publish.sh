#!/bin/bash

set -e

echo "🔨 Building component library..."

bun run build

echo "📦 Bundling CSS variables..."
cat src/styles-bundle.css dist/brutalist-ui.css > dist/brutalist-ui.css.tmp && mv dist/brutalist-ui.css.tmp dist/brutalist-ui.css

echo "📝 Verifying type declarations..."
if [ -f "dist/index.d.ts" ]; then
  echo "✅ TypeScript declarations generated successfully"
else
  echo "❌ Failed to generate TypeScript declarations"
  exit 1
fi

echo "📦 Preparing for publish..."

cp package.json package.json.backup

cp package.publish.json package.json

echo "📤 Publishing to npm..."

npm publish --dry-run

echo ""
echo "✅ Dry run complete! Review the output above."
echo ""
echo "To actually publish, press Enter. To cancel, press Ctrl+C"
read -r

echo "🚀 Publishing for real..."
npm publish --access public

echo ""
echo "✅ Published successfully!"

restore_package() {
    cp package.json.backup package.json
    rm package.json.backup
    echo "✅ Original package.json restored"
}

# Restore on exit
trap restore_package EXIT