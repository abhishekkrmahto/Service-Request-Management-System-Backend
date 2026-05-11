from fastapi import APIRouter
from main import app as app
from schemas import Service
import httpx

router = APIRouter()
SPRING_URL = "https://localhost:8081/"


# add service by user
@app.put("/createService")
async def create_Service(service:Service):
    async with httpx.AsyncClient() as client:
       response = await client.post(
           f"{SPRING_URL}/createService",
           json={
               "serviceName":service.serviceName,
               "serviceAddress":service.serviceAddress,
               "serviceDescription":service.serviceDescription
           }
       )
       
       print("SERVICE CREATED BY USER ",response)

       return response.json()
       
        