import React, { useRef, useState } from "react";

const Picture = ({ readablePicture, setReadablePicture, setPicture }) => {
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const handlePicture = (e) => {
        let pic = e.target.files[0];
        if (pic.type !== "image/jpeg" && pic.type !== "image/png" && pic.type !== "image/webp") {
            setError(`${pic.name} format is not supported`);
            return;
        } else if (pic.size > 1024 * 1024 * 5) {
            setError(`${pic.name} is too large, maximum 5MB allowed.`);
            return;
        } else {
            setError("");
            setPicture(pic);
            const reader = new FileReader();
            reader.readAsDataURL(pic);
            reader.onload = (e) => {
                setReadablePicture(e.target?.result);
            };
        }
    };

    const handleChangePic = () => {
        setPicture("");
        setReadablePicture("");
        inputRef.current?.click();
    };
    return (
        <div className="mt-8 content-center space-y-1">
            <label htmlFor="picture" className="label text-sm font-bold tracking-wide">
                picture (optional)
            </label>
            {readablePicture ? (
                <div>
                    <img
                        src={readablePicture}
                        alt="picture"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div
                        className="w-20 mt-2 py-1 rounded-md text-xs font-medium flex items-center justify-center cursor-pointer"
                        onClick={() => handleChangePic()}
                    >
                        change
                    </div>
                </div>
            ) : (
                <div
                    className="w-full h-12 bg-white rounded-md font-bold flex items-center justify-center cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                >
                    Upload picture
                </div>
            )}
            <input
                type="file"
                name="picture"
                id="picture"
                hidden
                ref={inputRef}
                accept="image/png,image/jpeg,image/webp"
                onChange={handlePicture}
            />

            <div className="mt-2">
                <p className="text-red-400">{error}</p>
            </div>
        </div>
    );
};

export default Picture;
