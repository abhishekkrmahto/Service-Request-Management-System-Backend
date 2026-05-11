from fastapi import APIRouter
from schemas import Service,UserSchema,SignInSchema
import httpx

router = APIRouter()

SPRING_URL = "http://localhost:8081"


@router.put("/createService")
async def create_Service(service: Service):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SPRING_URL}/createService",
            json={
                "serviceName": service.serviceName,
                "serviceAddress": service.serviceAddress,
                "serviceDescription": service.serviceDescription,
                "serviceType":service.serviceType
            }
        )

        print("SERVICE CREATED BY USER ", response)

        return response.json()
    
@router.post("/registerUser")
async def register_user(user:UserSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SPRING_URL}/registerUser",
            json={
                "name":user.name,
                "phone":user.phone,
                "address":user.address,
                "email":user.email,
                "password":user.password,
                "assignedServiceman":user.assignedServiceman
            }
        )
        print("USER CREATION DONE !!")
        return response.json()
    
@router.post("/signinUser")
async def signin_user(user:SignInSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SPRING_URL}/signinUser",
            json={
                "email":user.email,
                "password":user.password,
            }
        )
        print("USER CREATION DONE !!")
        return response.json()