python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m unittest discover tests/
python main.py
