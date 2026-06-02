# Monitoramento de Recursos da Base Lunar

Trabalho da disciplina Advanced Programming and Mobile Dev (FIAP - 2EMR).

App mobile feito em React Native (TypeScript) que se comunica com uma API em Spring Boot
para monitorar os recursos de uma base lunar: agua, energia, climatizacao e oxigenio.
Da pra cadastrar recursos e sensores, ver o status de cada um e acompanhar os alertas
quando algo chega num nivel critico.

## Integrantes

| Nome completo | RM |
|---------------|----|
| _preencher_   | _preencher_ |
| _preencher_   | _preencher_ |
| _preencher_   | _preencher_ |

## Organizacao

- `backend/` - API REST em Spring Boot (Java), com banco H2 em memoria
- `mobile/` - aplicativo em React Native + TypeScript (Expo)

O app faz as requisicoes HTTP (GET/POST/PUT) para a API, que guarda os dados no H2.
O banco ja sobe com alguns recursos e sensores de exemplo.

## Telas do app

- Dashboard com o resumo (qtd de recursos, sensores e alertas)
- Lista e cadastro de recursos, com tela de detalhe pra registrar uma nova leitura
- Lista e cadastro de sensores
- Tela de alertas (so os recursos em atencao ou critico)

## Rotas da API

Base: `http://localhost:8080/api`

| Metodo | Rota                       | O que faz                       |
|--------|----------------------------|---------------------------------|
| GET    | `/recursos`                | lista os recursos               |
| GET    | `/recursos/{id}`           | busca um recurso                |
| POST   | `/recursos`                | cadastra um recurso             |
| PUT    | `/recursos/{id}/leitura`   | atualiza o valor atual          |
| GET    | `/recursos/{id}/status`    | status do recurso               |
| GET    | `/sensores`                | lista os sensores               |
| POST   | `/sensores`                | cadastra um sensor              |
| GET    | `/alertas`                 | recursos em atencao ou critico  |

Exemplo de POST em `/recursos`:

```json
{
  "nome": "Reservatorio de Agua",
  "tipo": "AGUA",
  "unidade": "%",
  "valorAtual": 78,
  "limiteCritico": 20,
  "direcaoCritica": "ABAIXO"
}
```

## Como rodar

### Backend (precisa do JDK 17)

```bash
cd backend
mvnw.cmd spring-boot:run     # windows
./mvnw spring-boot:run       # linux/mac
```

Sobe em `http://localhost:8080`. O console do H2 fica em `http://localhost:8080/h2-console`
(url `jdbc:h2:mem:baselunar`, usuario `sa`, senha em branco).

### App (precisa do Node)

```bash
cd mobile
npm install
npm run web        # abrir no navegador
npm run android    # emulador ou celular com Expo Go
```

Se for testar no celular fisico, em `mobile/src/api/client.ts` troque o `LAN_IP` pelo
IP da sua maquina (`ipconfig`) e mantenha o celular na mesma rede do PC.

## Tecnologias

- Backend: Java 17, Spring Boot, Spring Web, Spring Data JPA, H2
- Mobile: React Native (Expo), TypeScript, React Navigation, axios
