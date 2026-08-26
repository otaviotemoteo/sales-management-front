# Stage 1: build
# Not the -alpine tags: Temurin publishes those for amd64 only, so the build
# fails outright on an Apple Silicon machine. These carry arm64.
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -q
COPY src ./src
RUN ./mvnw package -DskipTests -q

# Stage 2: runtime
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
