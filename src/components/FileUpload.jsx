import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
    },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div
        {...getRootProps()}
        className={`w-full max-w-2xl p-12 border-4 border-dashed rounded-lg cursor-pointer transition-all
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="mt-4 text-lg text-gray-600">
            {isDragActive ? 'Drop the video here' : 'Drag & drop a video file here'}
          </p>
          <p className="mt-2 text-sm text-gray-500">or click to browse</p>
          <p className="mt-1 text-xs text-gray-400">Supports: MP4, AVI, MOV, MKV</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;

