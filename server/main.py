import boto3
import qrcode
import os
from io import BytesIO
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
#from dotenv import load_dotenv
#load_dotenv()

app = FastAPI()

origin = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware, 
    allow_origins = origin,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.post("/generate-qr/")  
async def generate_qr(url:str):
    qr = qrcode.QRCode(
        version = 1,
        error_correction = qrcode.constants.ERROR_CORRECT_L,
        box_size = 10,
        border = 4,
    )
    qr.add_data(url)
    qr.make(fit= True)

    img = qr.make_image( fill_color = "black", back_color = "white")

    img_byte_arr = BytesIO()
    img.save(img_byte_arr, format = 'PNG')
    img_byte_arr.seek(0)

    return StreamingResponse(img_byte_arr, media_type="image/png")
