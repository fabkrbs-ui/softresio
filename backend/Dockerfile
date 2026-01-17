FROM denoland/deno:latest

WORKDIR /app

# Install dependencies
COPY deno.json deno.lock .
RUN deno install

# Copy app
COPY backend/src/ src/
COPY backend/types/ ./types/

CMD ["deno", "task", "start"]
