#!/bin/bash
set -e

echo "Iniciando Calculadora de Tributos..."

mkdir -p /run/nginx

# Inicia o nginx
nginx

# Inicia api-regime-geral em background (porta 8080, health em 9101)
java -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline \
  >/tmp/regime.log 2>&1 &
PID1=$!

# Inicia api-split-payment-simplificado em background (porta 8081, health em 9102)
# Override no caminho do banco pois o application.yml tem ./db/db/split.db (errado)
java -jar /calculadora/api-split-payment-simplificado.jar \
  "--spring.datasource.url=jdbc:sqlite:file:./calculadora/db/split.db?date_class=TEXT&date_string_format=yyyy-MM-dd" \
  >/tmp/split.log 2>&1 &
PID2=$!

echo "Aguardando APIs ficarem disponíveis..."

for i in $(seq 1 120); do
  health1=$(curl -sf http://localhost:9101/health 2>/dev/null || true)
  health2=$(curl -sf http://localhost:9102/health 2>/dev/null || true)

  if echo "$health1" | grep -q "UP" && echo "$health2" | grep -q "UP"; then
    echo "APIs disponíveis. Sistema pronto."
    break
  fi

  echo "Aguardando... tentativa $i/120"
  sleep 2
done

# Mantém o container vivo acompanhando os processos Java
wait $PID1 $PID2
