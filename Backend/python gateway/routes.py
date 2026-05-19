from fastapi import APIRouter
from schemas import Service,UserSchema,SignInSchema,ServiceManSchema
import httpx
from pydantic import BaseModel

router = APIRouter()

SPRING_URL = "http://localhost:8081"

#----------------------POST APIs-----------------------------

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
    
@router.post("/signinAdmin")
async def signin_admin(user: SignInSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SPRING_URL}/signinAdmin",
            json={
                "email": user.email,
                "password": user.password,
                "role":user.role
            }
        )

        return response.json()
    
@router.post("/signinUser")
async def signin_User(user: SignInSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            f"{SPRING_URL}/signinUser",
            json={
                "email": user.email,
                "password": user.password,
                "role": user.role
            }
        )

        return response.json()


@router.post("/signinServiceMan")
async def signin_serviceman(user: SignInSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{SPRING_URL}/signinServiceMan",
            json={
                "email": user.email,
                "password": user.password,
                "role":user.role
            }
        )

        return response.json()
    
    
#----------------------GET APIs-----------------------------

@router.get("/getServices/{email}")
async def get_services(email: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SPRING_URL}/getServices/{email}"
        )

    return response.json()

@router.get("/getAllServices")
async def get_all_services():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SPRING_URL}/getAllServices"
        )

    return response.json()


@router.get("/userInformation/{token}")
async def get_userInformation(token: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SPRING_URL}/userInformation/{token}"
        )

    return response.json()