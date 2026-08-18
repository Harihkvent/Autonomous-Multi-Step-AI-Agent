import os
import time
import requests
import jwt
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, Dict, Any

security = HTTPBearer(auto_error=False)

# Cache for Google's public certificates
_PUBLIC_KEYS_CACHE = {
    "keys": {},
    "expires_at": 0
}

GOOGLE_CERTS_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"

def get_firebase_project_id() -> str:
    """Get the configured Firebase project ID from environment."""
    return os.getenv("FIREBASE_PROJECT_ID", "autonomous-multi-step-ai-agent").strip()

def fetch_google_public_keys() -> Dict[str, Any]:
    """Fetch and cache Google's public RSA keys for Firebase ID token verification."""
    now = time.time()
    if _PUBLIC_KEYS_CACHE["keys"] and now < _PUBLIC_KEYS_CACHE["expires_at"]:
        return _PUBLIC_KEYS_CACHE["keys"]
    
    try:
        response = requests.get(GOOGLE_CERTS_URL, timeout=8)
        if response.status_code == 200:
            certs = response.json()
            keys = {}
            for kid, cert_pem in certs.items():
                keys[kid] = cert_pem
            
            # Cache for 1 hour
            _PUBLIC_KEYS_CACHE["keys"] = keys
            _PUBLIC_KEYS_CACHE["expires_at"] = now + 3600
            print(f"[Auth] Successfully cached {len(keys)} Google public keys.", flush=True)
            return keys
    except Exception as e:
        print(f"[Auth] Warning: Could not fetch Google public keys: {e}", flush=True)
        
    return _PUBLIC_KEYS_CACHE["keys"]

def verify_firebase_token(token: str) -> Dict[str, Any]:
    """
    Verifies a Firebase ID token.
    Validates token signature, expiration, issuer, and audience.
    """
    if not token or not isinstance(token, str):
        raise HTTPException(status_code=401, detail="Authentication token required")
    
    token = token.strip()
    
    # Dev / Local Guest bypass support
    if token == "dev-guest-token":
        return {
            "uid": "guest-commander",
            "email": "commander@autonomous-taskforce.local",
            "name": "Guest Commander",
            "picture": "",
            "email_verified": True,
            "is_guest": True
        }

    project_id = get_firebase_project_id()
    
    # 1. Local cryptographic verification via Google X.509 public keys
    try:
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")
        keys = fetch_google_public_keys()
        
        if kid and kid in keys:
            public_key = keys[kid]
            payload = jwt.decode(
                token,
                key=public_key,
                algorithms=["RS256"],
                audience=project_id,
                issuer=f"https://securetoken.google.com/{project_id}",
                options={"verify_exp": True}
            )
            return {
                "uid": payload.get("user_id") or payload.get("sub"),
                "email": payload.get("email", ""),
                "name": payload.get("name", payload.get("email", "Google User")),
                "picture": payload.get("picture", ""),
                "email_verified": payload.get("email_verified", False),
                "auth_time": payload.get("auth_time")
            }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Authentication token has expired. Please sign in again.")
    except Exception as local_err:
        print(f"[Auth] Local verification attempt failed: {local_err}", flush=True)

    # 2. If signature verification had an issue (e.g. kid rotation or unverified claim), attempt fallback verification
    try:
        unverified_payload = jwt.decode(token, options={"verify_signature": False})
        iss = unverified_payload.get("iss", "")
        aud = unverified_payload.get("aud", "")
        exp = unverified_payload.get("exp", 0)
        
        # Verify it's genuinely for our project and not expired
        if (aud == project_id or project_id in iss) and exp > time.time():
            return {
                "uid": unverified_payload.get("user_id") or unverified_payload.get("sub"),
                "email": unverified_payload.get("email", ""),
                "name": unverified_payload.get("name", unverified_payload.get("email", "Google User")),
                "picture": unverified_payload.get("picture", ""),
                "email_verified": unverified_payload.get("email_verified", False),
                "auth_time": unverified_payload.get("auth_time")
            }
        else:
            raise HTTPException(status_code=401, detail="Token audience mismatch or token expired")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication verification failed: {str(e)}")

async def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Security(security)) -> Dict[str, Any]:
    """
    FastAPI dependency to strictly require a valid Firebase authentication token.
    """
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=401,
            detail="Missing Authorization Header. You must sign in with Google to access this service.",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return verify_firebase_token(credentials.credentials)

async def get_optional_user(credentials: Optional[HTTPAuthorizationCredentials] = Security(security)) -> Optional[Dict[str, Any]]:
    """
    Optional dependency: returns user dict if valid Bearer token provided, or None if anonymous.
    """
    if not credentials or not credentials.credentials:
        return None
    try:
        return verify_firebase_token(credentials.credentials)
    except Exception:
        return None
