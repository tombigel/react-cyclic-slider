#!/usr/bin/env node

/**
 * This script updates version numbers in README and other project files
 * to match the current version in package.json
 */

const fs = require('fs');
const path = require('path');

// Get current version from package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = packageJson.version;

console.log(`Updating version references to ${version}...`);

// Files to update
const filesToUpdate = [
  'README.md',
  'public/index.html'
];

filesToUpdate.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Update version references
      content = content.replace(
        /react-cyclic-slider@\d+\.\d+\.\d+/g, 
        `react-cyclic-slider@${version}`
      );
      
      // For HTML files, update meta tags
      if (file.endsWith('.html')) {
        content = content.replace(
          /<meta name="version" content=".*?">/,
          `<meta name="version" content="${version}">`
        );
      }
      
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  } catch (err) {
    console.error(`Error updating ${file}:`, err);
  }
});

console.log('Version update complete!'); 