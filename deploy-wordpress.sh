#!/bin/bash

# Renovation Bridge WordPress Deployment Script

echo "🏗️  Building Next.js app for WordPress plugin deployment..."
npm run export

echo "📦 Preparing WordPress plugin structure..."

# Ensure the plugin file exists
if [ ! -f "wordpress-plugin.php" ]; then
  echo "❌ wordpress-plugin.php not found. Deployment aborted."
  exit 1
fi

# Create deployment package
echo "📝 Creating deployment package..."
mkdir -p deployment/renovationbridge
cp wordpress-plugin.php deployment/renovationbridge/
cp -r out deployment/renovationbridge/

echo "✅ Deployment package created in ./deployment/renovationbridge/"
echo ""
echo "To deploy manually:"
echo "1. Upload the contents of the 'deployment/renovationbridge' folder to your WordPress site at:"
echo "   /wp-content/plugins/renovationbridge/"
echo ""
echo "2. Activate the plugin in your WordPress admin panel"
echo "3. Use the shortcode [renovationbridge] on any page or post"
echo ""
echo "For GitHub automatic deployment:"
echo "- Push changes to the 'prod' branch"
echo "- Deployment destination: /wp-content/plugins/renovationbridge" 