import os
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from dotenv import load_dotenv

load_dotenv()

class AuthMiddleware(BaseHTTPMiddleware):
    CorsMiddleware = BaseHTTPMiddleware
    async def dispatch(self, request, call_next):
        # Check for the presence of the Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return JSONResponse(status_code=401, content={"detail": "Unauthorized"})
        
        # Extract the token from the header
        token = auth_header.split(" ")[1] if " " in auth_header else None
        
        # Validate the token (this is a placeholder, implement your own logic)
        if token != os.getenv("API_TOKEN"):
            return JSONResponse(status_code=401, content={"detail": "Unauthorized"})
        
        # If valid, proceed to the next middleware or route handler
        response = await call_next(request)
        return response