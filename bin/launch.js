#!/usr/bin/env node
var spawn = require('win-spawn');
var electronpath = require('electron-prebuilt');
var path = require('path');
var cwd = path.resolve(__dirname, '../');
spawn(electronpath, ['.'], {cwd: cwd, stdio: [0, 1, 2]});