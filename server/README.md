# How to run in an environment

```bash
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
fastapi dev main.py
```

# How to run locally

```bash
pip install -r requirements.txt
fastapi dev main.py
```

# Requirements
Requires a ".env" in the server directory
In the ".env" requires a key "OPENAI_KEY=open ai key"