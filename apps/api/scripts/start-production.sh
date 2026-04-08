#!/bin/sh
set -eu

pnpm migrate:deploy
node dist/index.js
