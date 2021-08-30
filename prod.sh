#!/bin/bash

source ormconfig-prod.env
env |sort
echo "entities found"
ls -l $TYPEORM_ENTITIES_DIR
nodemon build/api/app.js
