import os
from dotenv import load_dotenv
load_dotenv()

print("Krutrim Key:", os.getenv("KRUTRIM_CLOUD_API_KEY"))
print("Groq Key:", os.getenv("GROQ_API_KEY"))

try:
    from krutrim_cloud import KrutrimCloud
    client = KrutrimCloud(api_key=os.getenv("KRUTRIM_CLOUD_API_KEY"))
    print("Krutrim base url:", getattr(client, "base_url", "None"))
    res = client.chat.completions.create(
        model="Krutrim-spectre-v2",
        messages=[{"role": "user", "content": "Hello"}]
    )
    print("Krutrim response:", res)
except Exception as e:
    print("Krutrim error:", e)

try:
    from openai import OpenAI
    client_groq = OpenAI(
        api_key=os.getenv("GROQ_API_KEY"),
        base_url="https://api.groq.com/openai/v1"
    )
    res_groq = client_groq.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": "Hello"}]
    )
    print("Groq response:", res_groq.choices[0].message.content)
except Exception as e:
    print("Groq error:", e)
