"""
Vercel Serverless Function Entry Point.
Imports the FastAPI app from the root api.py via importlib to avoid
circular import issues caused by the api/ directory vs api.py naming conflict.
"""
import sys
import os

# Add project root to Python path so all modules resolve correctly
_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _root not in sys.path:
    sys.path.insert(0, _root)

# Use importlib to load root api.py without triggering circular import
import importlib.util
_spec = importlib.util.spec_from_file_location(
    "root_api",
    os.path.join(_root, "api.py")
)
_mod = importlib.util.module_from_spec(_spec)
sys.modules["root_api"] = _mod
_spec.loader.exec_module(_mod)

# Expose the FastAPI app object for Vercel's ASGI handler
app = _mod.app
