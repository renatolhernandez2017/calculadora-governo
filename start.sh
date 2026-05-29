#!/bin/bash

echo "===== JAVA ====="
java -version

echo "===== ARQUIVOS ====="
ls -lah /calculadora

echo "===== BANCOS ====="
ls -lah /calculadora/db

echo "===== TESTE REGIME ====="
java -jar /calculadora/api-regime-geral.jar