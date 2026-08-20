"""
Vercel Serverless Function Entry Point.
Imports the FastAPI app from the root api.py via importlib to avoid
circular import issues caused by the api/ directory vs api.py naming conflict.
Wrapped with error handling so missing env vars return a 503 instead of crashing.
"""
import sys
import os

# Add project root to Python path so all modules resolve correctly
_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _root not in sys.path:
    sys.path.insert(0, _root)

try:
    import importlib.util
    _spec = importlib.util.spec_from_file_location(
        "root_api",
        os.path.join(_root, "api.py")
    )
    _mod = importlib.util.module_from_spec(_spec)
    sys.modules["root_api"] = _mod
    _spec.loader.exec_module(_mod)
    app = _mod.app

except Exception as _e:
    # If the app fails to load (e.g. missing env vars), return a minimal
    # FastAPI app that reports the error instead of crashing Vercel cold-start
    import traceback
    _tb = traceback.format_exc()

    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import JSONResponse

    app = FastAPI(title="Agent API – Degraded Mode")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    async def fallback(path: str):
        return JSONResponse(
            status_code=503,
            content={
                "error": "Backend failed to initialise. Check Vercel environment variables.",
                "detail": str(_e),
                "traceback": _tb,
            },
        )
