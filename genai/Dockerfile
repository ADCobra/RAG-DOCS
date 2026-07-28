# pyproject.toml declares requires-python >=3.13, so a 3.12 base fails at `uv sync`.
FROM python:3.13-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

ARG APP_ENV=production
ENV APP_ENV=$APP_ENV

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy

COPY pyproject.toml uv.lock ./

RUN uv sync --frozen --no-install-project --no-dev

ENV PATH="/app/.venv/bin:$PATH"
ENV PORT=8000

COPY . .

EXPOSE 8000

# Shell form so ${PORT} expands at runtime; the app lives at app/main.py, not main.py.
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
