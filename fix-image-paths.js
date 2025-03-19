const fs = require('fs');
const path = require('path');

// Function to recursively get all HTML files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else if (path.extname(filePath) === '.html') {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Fix image paths in HTML files
function fixImagePaths() {
  const outDir = path.join(process.cwd(), 'out');
  const htmlFiles = getAllFiles(outDir);

  htmlFiles.forEach((filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix image src attributes
    content = content.replace(/src="\/images\//g, 'src="/renovationbridge/images/');
    
    // Fix background images in inline styles
    content = content.replace(/url\(\/images\//g, 'url(/renovationbridge/images/');
    
    // Fix any other asset paths that start with /
    content = content.replace(/href="\/(?!renovationbridge)/g, 'href="/renovationbridge/');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed paths in ${filePath}`);
  });
}

fixImagePaths(); 