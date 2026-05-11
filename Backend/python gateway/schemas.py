from pydantic import BaseModel

class UserSchema(BaseModel):
    name:str
    phone:int
    address:str
    email:str
    password:str
    assignedServiceman:str


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

class Service(BaseModel):
    serviceName:str
    serviceAddress:str
    serviceDescription:str