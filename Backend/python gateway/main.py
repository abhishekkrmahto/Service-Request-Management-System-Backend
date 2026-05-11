from fastapi import FastAPI

app = FastAPI()


@app.get("/checker")
def checkerFunction():
    return {"isOK": "YES"}

