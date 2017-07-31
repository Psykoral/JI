#!/bin/sh
echo "checking for bower core updates..."
npm update -g bower
echo "pruning unused bower modules..."
bower prune
echo "cleaning cached bower modules..."
bower cache clean
echo "running bower update..."
bower update
echo "running bower install..."
bower install
echo "clearing npm cache..."
npm cache clear
echo "pruning unused npm modules..."
npm prune
echo "running npm update..."
npm update
echo "running npm install..."
npm install
echo "Done. Check for errors above!"
