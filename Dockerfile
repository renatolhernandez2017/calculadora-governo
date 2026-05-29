FROM eclipse-temurin:21-jre

RUN apt-get update &&     apt-get install -y nginx curl &&     rm -rf /var/lib/apt/lists/*

COPY frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /calculadora

COPY api-regime-geral.jar .
COPY api-split-payment-simplificado.jar .
COPY start.sh .

RUN mkdir -p /calculadora/calculadora/db

COPY calculadora/db/calculadora-pro.db /calculadora/calculadora/db/
COPY calculadora/db/split.db /calculadora/calculadora/db/

RUN chmod +x /calculadora/start.sh

EXPOSE 80

CMD ["/bin/bash", "/calculadora/start.sh"]
