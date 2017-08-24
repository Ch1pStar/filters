@ECHO off

pushd %~dp0
CALL yarn install
CALL grunt build:dev
CALL node install.js

PAUSE

