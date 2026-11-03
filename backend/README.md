# CodeForge backend

This backend is the Spring Boot foundation for the CodeForge campus competitive programming platform.

## Services

- API Gateway: `api-gateway` on port `8080`
- Auth Service: `services/auth-service` on port `8081`
- Problem Service: `services/problem-service` on port `8082`
- Contest Service: `services/contest-service` on port `8083`
- Submission Service: `services/submission-service` on port `8084`
- Evaluation Service: `services/evaluation-service` on port `8086`

## Local development

```bash
cd backend
C:\Users\Asus\.maven\apache-maven-3.9.9\bin\mvn test
```

## Run locally with Docker Compose

```bash
cd backend
docker compose up --build
```

## Configure environment

Copy `.env.example` to `.env` and adjust values if needed before running Docker compose.

## Current implementation status

The auth service foundation is implemented with registration, login, JWT issuance, and secured endpoints. The gateway routes requests to the auth service. This is the starting point for the remaining microservice modules.
