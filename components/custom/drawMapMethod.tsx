import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import DropzoneInput from "./dropZoneInput";

interface DrawMapMethodProps {
  onFileUpload: (data: GeoJSON.FeatureCollection) => void;
}

export default function DrawMapMethod({ onFileUpload }: DrawMapMethodProps) {
  return (
    <>
      <Tabs defaultValue="draw" className="flex flex-col border-2 h-80">
        <TabsList>
          <TabsTrigger value="draw">Draw</TabsTrigger>
          <TabsTrigger value="search-address">Search By Address</TabsTrigger>
          <TabsTrigger value="lookup">Lookup lot/dp</TabsTrigger>
          <TabsTrigger value="upload-boundary">
            Upload Project Boundary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="draw" className="flex-1 px-4 py-5">
          <div className="flex justify-center items-center h-full bg-gray-300">
            <p>Instructions on how to draw Project Area</p>
          </div>
        </TabsContent>
        <TabsContent value="search-address" className="flex-1 px-4 py-5">
          <div className="flex h-full bg-gray-300 p-4">
            <Input type="text" placeholder="Address" />
          </div>
        </TabsContent>
        <TabsContent value="lookup" className="flex-1 px-4 py-5">
          <div className="flex flex-col gap-4 h-full bg-gray-300 p-4">
            <Input type="text" placeholder="Lot#" className="w-1/2" />
            <Input type="text" placeholder="DP#" className="w-1/2" />
          </div>
        </TabsContent>
        <TabsContent value="upload-boundary" className="flex-1 px-4 py-5">
          <div className="flex justify-center items-center h-full bg-gray-300 relative">
            <p className="absolute top-3 left-3">Upload project boundary (*.GeoJSON, *.KML)</p>
            <DropzoneInput onFileUpload={onFileUpload} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
