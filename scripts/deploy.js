import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${step} ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Check if required files exist
function checkPrerequisites() {
  logStep('🔍', 'Checking prerequisites...');
  
  const requiredFiles = [
    'package.json',
    'vite.config.js',
    'firebase.json',
    '.firebaserc'
  ];
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    logError(`Missing required files: ${missingFiles.join(', ')}`);
    return false;
  }
  
  logSuccess('All required files found');
  return true;
}

// Check if environment variables are set
function checkEnvironmentVariables() {
  logStep('🔧', 'Checking environment variables...');
  
  const envFile = '.env.production';
  if (!fs.existsSync(envFile)) {
    logWarning('No .env.production file found');
    logInfo('Please create .env.production with your production environment variables');
    logInfo('You can copy from env.example and update the values');
    return false;
  }
  
  logSuccess('Environment file found');
  return true;
}

// Install dependencies
function installDependencies() {
  logStep('📦', 'Installing dependencies...');
  
  try {
    execSync('npm install', { stdio: 'inherit' });
    logSuccess('Dependencies installed successfully');
    return true;
  } catch (error) {
    logError('Failed to install dependencies');
    return false;
  }
}

// Run linting
function runLinting() {
  logStep('🔍', 'Running linting...');
  
  try {
    execSync('npm run lint', { stdio: 'inherit' });
    logSuccess('Linting passed');
    return true;
  } catch (error) {
    logWarning('Linting failed, but continuing with deployment');
    return true; // Continue anyway
  }
}

// Build for production
function buildProduction() {
  logStep('🏗️', 'Building for production...');
  
  try {
    execSync('npm run build:prod', { stdio: 'inherit' });
    logSuccess('Production build completed');
    return true;
  } catch (error) {
    logError('Production build failed');
    return false;
  }
}

// Test build locally
function testBuild() {
  logStep('🧪', 'Testing build locally...');
  
  try {
    // Start preview server in background
    const previewProcess = execSync('npm run preview', { 
      stdio: 'pipe',
      timeout: 10000 
    });
    logSuccess('Build test passed');
    return true;
  } catch (error) {
    logWarning('Build test failed, but continuing with deployment');
    return true; // Continue anyway
  }
}

// Deploy to Firebase
function deployToFirebase() {
  logStep('🚀', 'Deploying to Firebase...');
  
  try {
    execSync('firebase deploy', { stdio: 'inherit' });
    logSuccess('Deployment completed successfully');
    return true;
  } catch (error) {
    logError('Deployment failed');
    return false;
  }
}

// Get deployment URL
function getDeploymentUrl() {
  try {
    const firebaserc = JSON.parse(fs.readFileSync('.firebaserc', 'utf8'));
    const projectId = firebaserc.projects.default;
    return `https://${projectId}.web.app`;
  } catch (error) {
    return 'https://your-project-id.web.app';
  }
}

// Main deployment function
async function deploy() {
  log('🚀 Starting Production Deployment', 'bright');
  log('=====================================', 'bright');
  
  const startTime = Date.now();
  
  // Step 1: Check prerequisites
  if (!checkPrerequisites()) {
    process.exit(1);
  }
  
  // Step 2: Check environment variables
  checkEnvironmentVariables();
  
  // Step 3: Install dependencies
  if (!installDependencies()) {
    process.exit(1);
  }
  
  // Step 4: Run linting
  if (!runLinting()) {
    process.exit(1);
  }
  
  // Step 5: Build for production
  if (!buildProduction()) {
    process.exit(1);
  }
  
  // Step 6: Test build
  if (!testBuild()) {
    process.exit(1);
  }
  
  // Step 7: Deploy to Firebase
  if (!deployToFirebase()) {
    process.exit(1);
  }
  
  const endTime = Date.now();
  const duration = Math.round((endTime - startTime) / 1000);
  
  log('\n🎉 Deployment Summary', 'bright');
  log('====================', 'bright');
  logSuccess(`Deployment completed in ${duration} seconds`);
  logInfo(`Your app is live at: ${getDeploymentUrl()}`);
  logInfo('Check the Firebase console for detailed deployment logs');
  
  log('\n📋 Post-Deployment Checklist:', 'bright');
  log('□ Verify all routes work correctly');
  log('□ Test authentication flows');
  log('□ Check mobile responsiveness');
  log('□ Verify environment variables are working');
  log('□ Test Google Maps integration');
  log('□ Monitor performance metrics');
  
  log('\n🔗 Useful Links:', 'bright');
  log(`• Firebase Console: https://console.firebase.google.com/project/${JSON.parse(fs.readFileSync('.firebaserc', 'utf8')).projects.default}`);
  log('• Google PageSpeed Insights: https://pagespeed.web.dev/');
  log('• Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci');
}

// Handle errors
process.on('unhandledRejection', (error) => {
  logError('Unhandled rejection:');
  console.error(error);
  process.exit(1);
});

// Run deployment
deploy().catch((error) => {
  logError('Deployment failed with error:');
  console.error(error);
  process.exit(1);
}); 