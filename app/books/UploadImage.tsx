"use client"
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';

interface CloudinaryResult {
    public_id: string;
}

const UploadImage = () => {
    const [publicId, setPublicId] = useState("");

    return (
        <>
            {publicId && (
                <CldImage
                    width="260"
                    height="100"
                    src={publicId}
                    sizes="100vw"
                    alt="Description of my image"
                />
            )}

            <CldUploadWidget
                uploadPreset="uyrw2jhq"
                onUpload={(result) => {
                    if (result.event !== "success") return;
                    const info = result.info as CloudinaryResult;
                    setPublicId(info.public_id);
                    console.log(info);
                }}
            >
                {({ open }) => {
                    return (
                        <button onClick={() => open()} className='bg-blue-400 px-4 py-2'>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </>
    );
}

export default UploadImage;
