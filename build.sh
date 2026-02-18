#!/bin/bash
set -e

echo "Building backend..."
cd server
npm install
echo "Backend ready"

echo "Building frontend..."
cd ../client
npm install
npm run build
echo "Frontend ready"
