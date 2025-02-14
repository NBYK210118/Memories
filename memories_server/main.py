import requests
import torch
import io
import numpy as np
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from PIL import Image
import torchvision.transforms as transforms
from fastapi.middleware.cors import CORSMiddleware
from networks import UnetGenerator
from fastapi.staticfiles import StaticFiles
import os

device = 'cuda' if torch.cuda.is_available() else 'cpu'

app = FastAPI()
### FastAPI 에서는 StaticFiles를 설정하여 정적 파일을 제공해야함
# 'static' directory 를 FastAPI의 정적 파일 폴더로 설정
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],  
)

transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
])

@app.post("/predict")
async def predict(file: UploadFile = File(...), model_url: str = Form(...)):
    try:
        filename = os.path.splitext(file.filename)[0]
        model_res = requests.get(model_url)
        if model_res.status_code != 200:
            raise HTTPException(status_code=403, detail=f"Failed to download model: {model_res.status_code}")
        
        model_weights = torch.load(io.BytesIO(model_res.content), map_location=device)
        model = UnetGenerator(3,3,8).to(device=device)
        model.load_state_dict(model_weights)
       
        model.eval()
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        image_np = np.array(image, dtype=np.float32) / 255.0
        input_tensor = torch.from_numpy(image_np).permute(2,0,1)
        input_tensor = transform(image).unsqueeze(0)
        
        output = model(input_tensor.to(device))
        
        output_np = output.squeeze().detach().cpu().numpy() 
        
        output_np = np.clip(output_np * 255, 0, 255).astype(np.uint8)  
        
        if output_np.ndim == 2:  
            output_image = Image.fromarray(output_np, mode="L")
        else:  
            output_image = Image.fromarray(np.transpose(output_np, (1, 2, 0)), mode="RGB")

        output_image_path =  f"./static/{filename}_output.jpg"
        output_image.save(output_image_path)

        return {"generated_image": f"http://localhost:5000/static/{filename}_output.jpg"}

    except Exception as e:
        return {"error": str(e)}