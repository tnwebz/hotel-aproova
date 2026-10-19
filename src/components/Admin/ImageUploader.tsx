"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, X, RefreshCw, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { getStorageImageUrl, compressImage } from "@/lib/supabase/storage";

interface ImageUploaderProps {
  currentImagePath?: string | null;
  pendingFile: File | null;
  onFileSelect: (file: File | null) => void;
  onRemoveCurrent: () => void;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImagePath,
  pendingFile,
  onFileSelect,
  onRemoveCurrent,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalSizeBytes, setOriginalSizeBytes] = useState<number | null>(null);

  // Generate preview URL if pending file exists
  const previewUrl = React.useMemo(() => {
    if (pendingFile) {
      return URL.createObjectURL(pendingFile);
    }
    if (currentImagePath) {
      return getStorageImageUrl(currentImagePath);
    }
    return null;
  }, [pendingFile, currentImagePath]);

  const handleFiles = async (files: FileList | null) => {
    setErrorMsg(null);
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (file.type && !validTypes.includes(file.type)) {
      setErrorMsg("Please select a JPEG, PNG, or WebP image.");
      return;
    }

    setIsCompressing(true);
    setOriginalSizeBytes(file.size);

    try {
      // Automatically resize & compress any image to ~300KB
      const compressedFile = await compressImage(file, 1280, 350 * 1024);
      onFileSelect(compressedFile);
    } catch (err: any) {
      console.warn("Auto-compression warning, using original file:", err);
      onFileSelect(file);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
        Product Image
      </label>

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
      />

      {/* Preview, Compressing State, or Dropzone */}
      {isCompressing ? (
        <div className="border-2 border-dashed border-amber-500/60 rounded-xl p-8 flex flex-col items-center justify-center gap-2 bg-amber-50/40 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 animate-spin">
            <Loader2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900">
              Resizing & Optimizing Photo...
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Automatically compressing to ~300 KB WebP for blazing-fast mobile viewing
            </p>
          </div>
        </div>
      ) : previewUrl ? (
        <div className="relative group rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50 p-2">
          <div className="relative w-full h-44 sm:h-52 rounded-lg overflow-hidden bg-zinc-900/5">
            <img
              src={previewUrl}
              alt="Product Preview"
              className="w-full h-full object-cover"
            />

            {/* Overlay actions */}
            <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="px-3 py-1.5 bg-white text-zinc-900 rounded-lg text-xs font-semibold shadow-md hover:bg-zinc-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Replace Photo
              </button>
              <button
                type="button"
                onClick={() => {
                  if (pendingFile) {
                    onFileSelect(null);
                    setOriginalSizeBytes(null);
                  } else {
                    onRemoveCurrent();
                  }
                }}
                disabled={disabled}
                className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold shadow-md hover:bg-rose-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 px-1">
            <span className="flex items-center gap-1.5">
              {pendingFile ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-emerald-700">
                    {(pendingFile.size / 1024).toFixed(0)} KB WebP
                  </span>
                  {originalSizeBytes && originalSizeBytes > pendingFile.size && (
                    <span className="text-[11px] text-zinc-400">
                      (optimized from {(originalSizeBytes / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  )}
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Active menu photo</span>
                </>
              )}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-amber-700 hover:text-amber-800 font-semibold underline cursor-pointer"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => {
                  if (pendingFile) {
                    onFileSelect(null);
                    setOriginalSizeBytes(null);
                  } else {
                    onRemoveCurrent();
                  }
                }}
                className="text-rose-600 hover:text-rose-700 font-semibold underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-center transition-all ${
            dragActive
              ? "border-amber-600 bg-amber-50/50"
              : "border-zinc-300 hover:border-zinc-400 bg-zinc-50/50 hover:bg-zinc-50"
          } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-zinc-200/80 flex items-center justify-center text-amber-700">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-800">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              JPG, PNG, or WebP · Any size (auto-compressed to ~300 KB)
            </p>
          </div>
          <button
            type="button"
            className="mt-1 px-3.5 py-1.5 bg-white text-zinc-800 border border-zinc-200 shadow-xs hover:bg-zinc-100 rounded-lg text-xs font-semibold"
          >
            Select Photo
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
