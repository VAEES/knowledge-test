#!/bin/bash

source ormconfig.env
env |sort
echo "entities"
ls -l $TYPEORM_ENTITIES_DIR
nodemon -V src/api/app.ts
