import React, { useRef, useState } from 'react';
import { Camera, Upload, X, User as UserIcon, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AvatarUploadProps {
  currentImage?: string;
  onImageChange: (base64: string) => void;
  onRemove: () => void;
  className?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ 
  currentImage, 
  onImageChange, 
  onRemove,
  className 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;
    
    // Validate type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate size (max 2MB for localstorage safety)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onImageChange(base64);
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-start gap-6">
        {/* Preview Area */}
        <div className="relative group shrink-0">
          <div className={cn(
            "w-24 h-24 rounded-full overflow-hidden border-2",
            isDragging ? "border-primary ring-4 ring-primary/10" : "border-slate-200 dark:border-slate-700",
            "bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative"
          )}>
            {isLoading ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : currentImage ? (
              <img 
                src={currentImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-10 h-10 text-slate-400" />
            )}
            
            {/* Hover Overlay */}
            <div 
              onClick={handleClick}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            >
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Actions Area */}
        <div className="flex-1 space-y-3">
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 transition-all duration-200 text-center cursor-pointer",
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            )}
            onClick={handleClick}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <Upload className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Click to upload or drag and drop
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                SVG, PNG, JPG or GIF (max. 2MB)
              </div>
            </div>
          </div>

          {currentImage && (
            <button
              onClick={onRemove}
              className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1.5 px-1"
            >
              <X className="w-3.5 h-3.5" />
              Remove photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
