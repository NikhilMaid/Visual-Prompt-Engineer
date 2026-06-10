
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  imageUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, imageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageChange(file);
      }
    }
  }, [onImageChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative w-full aspect-video border-2 border-dashed rounded-lg p-4 flex items-center justify-center text-center cursor-pointer transition-all duration-300 ${
        isDragging ? 'border-brand-primary bg-brand-primary/10' : 'border-brand-border hover:border-brand-secondary'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded preview" className="max-h-full max-w-full object-contain rounded-md" />
      ) : (
        <div className="flex flex-col items-center text-brand-text-secondary">
          <UploadIcon className="w-12 h-12 mb-2" />
          <p className="font-semibold">
            <span className="text-brand-secondary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs">PNG, JPG, WEBP, etc.</p>
        </div>
      )}
    </div>
  );
};
