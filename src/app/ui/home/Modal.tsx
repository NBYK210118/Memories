import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

// 불필요한 리렌더링 방지
interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploadModal: React.FC<ModalProps> = React.memo(({ showModal, setShowModal }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 불필요하게 재생성되지 않도록 최적화
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setIsLoading(true);
    handlePredict(file);
  }, []);

  const handlePredict = useCallback(async (file: File) => {
    try {
      setIsLoading(true);

      // Step 1: AWS S3에서 Presigned URL 가져오기
      const res = await fetch("/api/s3/download");
      const { url: modelUrl } = await res.json();

      // Step 2: 파일을 FormData로 변환하여 Python 서버로 전송
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model_url", modelUrl);

      const predictRes = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!predictRes.ok) throw new Error("Failed to generate the image"); 

      const data = await predictRes.json();
    
      if (!data.generated_image) throw new Error("Invalid response from server.")

      setGeneratedImage(data.generated_image);
    } catch (error) {
      console.error("Prediction error:", error);
      setErrorMessage("Failed to generate the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownload = async () => {
    if (!generatedImage) return;

    try{
        const response = await fetch(generatedImage);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "generate_image.jpg";
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }catch(error){
        console.log("다운로드 실패: ", error);
    }
  }
  
  useEffect(() => {
    console.log("generatedImage 업데이트됨:", generatedImage);
  }, [generatedImage]);

  useEffect(() => {
    if (!showModal) {
      setSelectedImage(null);
      setGeneratedImage(null);
    }
  }, [showModal]);

  if (!showModal) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div id="contentBox" className={`overflow-hidden max-h-full object-contain relative bg-white p-10 rounded-lg shadow-lg w-[40rem] 
        ${generatedImage ? "h-[30rem]" : "h-[25rem]"} flex flex-col`}>

        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 left-2 p-1 bg-slate-100/50 rounded-full cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          <XMarkIcon className="h-5 w-5 text-black" />
        </button>

        {/* 제목 및 설명 */}
        <h2 className="text-2xl font-bold text-center mb-2">Let's convert your Image!</h2>
        {errorMessage && <p className="text-red-500 text-center font-semibold">{errorMessage}</p>}
        <p className="text-lg text-center text-gray-600 mb-4">
          {generatedImage ? (
            <>
              <p className="text-gray text-xs">To achieve the highest quality results, please upload a clear, high-resolution image of a dog or cat.</p>
              <br />
              <span className="text-sm text-gray-500">(Supported formats: JPG, JPEG, PNG)</span>
            </>
          ) : (
            "Select an image of your puppy"
          )}
        </p>

        {/* 업로드 UI */}
        <label className={`flex-grow ${generatedImage ? "bg-transparent" : "bg-gray-400"} rounded-lg flex items-center justify-center cursor-pointer`}>
          {isLoading ? (
            <div className="animate-spin w-10 h-10 border-4 border-white border-t-transparent rounded-full"></div>
          ) : selectedImage ? (
            generatedImage ? (
              <div className="flex w-full justify-between gap-4 p-3">
                <Image width={350} height={250} src={selectedImage} alt="Uploaded" className="w-1/2 max-h-[250px] object-cover rounded-lg hover:scale-110 transition-all duration-300" />
                <div className="relative w-1/2" onClick={()=>handleDownload()}>
                  <Image width={350} height={250} src={generatedImage} alt="Generated" className="w-full max-h-[250px] object-cover rounded-lg hover:scale-110 transition-all duration-300" />
                  <button className="absolute top-2 right-2 bg-gray-800 text-sm text-white p-2 rounded-md hover:bg-slate-400 transition-all duration-300">
                    Download
                  </button>
                </div>
              </div>
            ) : (
            <div className="animate-spin w-10 h-10 border-4 border-white border-t-transparent rounded-full"></div>
            )
          ) : (
            <p className="text-white font-semibold">Upload your adorable friend</p>
          )}
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
});

export default ImageUploadModal;
