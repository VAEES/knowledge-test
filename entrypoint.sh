#!/bin/bash

export TYPEORM_ENTITIES="${PWD}/build/domain/entities/*.js"
export TYPEORM_ENTITIES_DIR="${PWD}/build/domain/entities/"
export TYPEORM_MIGRATIONS_DIR="${PWD}/build/infra/migrations/"
export TYPEORM_SUBSCRIBERS_DIR="${PWD}/build/infra/subscriptions/"
env |sort
nodemon build/api/app.js
