from pydantic import BaseModel
from typing import Optional

class UserSchema(BaseModel):
    name:str
    phone:int
    address:str
    email:str
    password:str
    assignedServiceman:str
    role:str


class ServiceManSchema(BaseModel):
    name:str
    service:str
    slot:str
    assignedServices:list
    phone:int
    email:str
    password:str
    serviceManCode:str
    serviceType:str # technical[ST001],plumbing[ST002],electrician etc ---> w.r.t Service code
    role:str
    

class Service(BaseModel):
    userEmail:str
    serviceName:str
    serviceAddress:str
    serviceDescription:str
    serviceType:str
    priority:int
    status:str
    createdAt:str
    updatedAt:str
    assignedTo: Optional[str] = None
    
    
class SignInSchema(BaseModel):
    email:str
    password:str
    role:str