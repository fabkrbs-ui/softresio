FROM denoland/deno:latest

WORKDIR /app

# Install dependencies
COPY deno.json deno.lock .
RUN deno install

# Copy app
COPY src/ src/

CMD ["deno", "task", "start"]
