import { kml } from "@tmcw/togeojson";
import { FileQuestion, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface DropzoneInputProps {
  onFileUpload: (data: any) => void;
}

const DropzoneInput: React.FC<DropzoneInputProps> = ({ onFileUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/file": [".geojson", ".kml"],
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result as string;
          let data;
          if (file.name.endsWith(".geojson")) {
            data = JSON.parse(text);
          } else if (file.name.endsWith(".kml")) {
            const parser = new DOMParser();
            const kmlDoc = parser.parseFromString(text, "text/xml");
            data = kml(kmlDoc);
          }
          onFileUpload(data);
        };
        reader.readAsText(file);
      });
    },
  });

  return (
    <div
      className="flex justify-center items-center gap-8 px-12 py-4 bg-white border border-gray-500 rounded-lg cursor-pointer"
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
        accept=".geojson,.kml"
        className="w-full h-full"
      />
      <Upload className="w-14 h-14" />
      <FileQuestion className="w-14 h-14" />
    </div>
  );
};

export default DropzoneInput;
