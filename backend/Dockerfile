# Stage 1: Build Maven
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

# Copie le contenu du dossier courant dans /app
COPY . .

# Si le pom.xml est dans un sous-dossier backend lors de la copie, on se déplace ou on lance mvn depuis ce dossier
RUN mvn clean package -DskipTests -f pom.xml

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]