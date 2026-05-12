from fastapi import APIRouter
from schemas import Service,UserSchema,SignInSchema,ServiceManSchema
import httpx

router = APIRouter()

SPRING_URL = "http://localhost:8081"

@router.post("/createService")
async def create_Service(service: Service):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SPRING_URL}/createService",
            json={
                "userEmail":service.userEmail,
                "serviceName": service.serviceName,
                "serviceAddress": service.serviceAddress,
                "serviceDescription": service.serviceDescription,
                "serviceType":service.serviceType,
                "priority":service.priority,
                "status":service.status,
                "createdAt":service.createdAt,
                "updatedAt":service.updatedAt,
                "assignedTo":service.assignedTo,
            }
        )

        print("SERVICE CREATED BY USER ", response)
        print(response.text)

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
                "assignedServiceman":user.assignedServiceman,
                "role":"user"
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

@router.post("/registerServiceMan")
async def register_serviceMan(serviceman:ServiceManSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SPRING_URL}/registerServiceMan",
            json={
                "name":serviceman.name,
                "service":serviceman.service,
                "slot":serviceman.slot,
                "assignedServices":serviceman.assignedServices,
                "phone":serviceman.phone,
                "email":serviceman.email,
                "password":serviceman.password,
                "serviceManCode":serviceman.serviceManCode,
                "serviceType":serviceman.serviceType,
                "role":"serviceman"
            }
        )
        
        print("Service man created !!")
        return response.json()