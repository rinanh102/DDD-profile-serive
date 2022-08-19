#!/bin/bash
docker build -f ci/Dockerfile --build-arg NPM_TOKEN=$NPM_TOKEN -t registry.cbidigital.com/catholic-profile-service:$1 .
echo "Building registry.cbidigital.com/catholic-profile-service:$1 ..."
docker tag registry.cbidigital.com/catholic-profile-service:$1 registry.cbidigital.com/catholic-profile-service:latest
docker push registry.cbidigital.com/catholic-profile-service:$1
docker push registry.cbidigital.com/catholic-profile-service:latest
