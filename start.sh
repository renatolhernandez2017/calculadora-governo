#!/bin/bash

echo "INICIANDO"

java \
  -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline \
  --spring.datasource.url=jdbc:sqlite:/calculadora/db/calculadora-pro.db
