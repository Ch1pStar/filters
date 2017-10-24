@ECHO off

pushd %~dp0
CALL npm install --save
CALL grunt build:dev
CALL node install.js

PAUSE

