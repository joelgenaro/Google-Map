'use client';

import { useSeedsNearMeContext } from '@/components/context/SeedsNearMeContext';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeoJsonUploader from './GeoJsonUploader';

const StepOneInput = () => {
  const {
    projectsData,
    selectedProjectToLink,
    setSelectedProjectToLink,
    setAddressData,
    setGeoJsonData,
  } = useSeedsNearMeContext();

  // Handles the uploaded polygon from the map and sets it to the context
  const handleGeoFileUpload = (data: GeoJSON.FeatureCollection) => {
    setGeoJsonData(data);
    setAddressData(null);
  };

  return (
    <>
      <div className="flex min-h-14 items-center justify-center rounded-xl px-4 py-2 shadow-around">
        <Label className="w-full">
          Link seed request to an existing project?
        </Label>
        <Select
          value={selectedProjectToLink || ''}
          onValueChange={(value) => setSelectedProjectToLink(value)}
        >
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Please select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {projectsData.length > 0 ? (
                projectsData
                  .filter((item) => item.id)
                  .map((item) => (
                    <SelectItem key={item.id} value={item.id || ''}>
                      {item.projectName}
                    </SelectItem>
                  ))
              ) : (
                <SelectItem disabled value="NA">
                  No available projects
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex min-h-36 flex-col items-start justify-start gap-2 rounded-xl p-4 shadow-around">
        <div className="self-start text-lg font-bold capitalize">
          Reminders:
        </div>
        <ul className="list-inside list-disc">
          <li className="pl-6 text-sm font-semibold">
            For best results, please upload or draw your Project Area Boundary
          </li>
          <li className="pl-6 text-sm font-semibold">
            Adding a point location (drop pin) may result in less accurate
            and/or non-comprehensive species list
          </li>
        </ul>
      </div>
      <Tabs
        defaultValue="upload-location"
        className="flex flex-1 flex-col rounded-xl border-2 shadow-around md:max-h-snm-upload-geojson md:min-h-snm-upload-geojson"
      >
        <TabsList className="h-10">
          <TabsTrigger
            value="upload-location"
            className="overflow-hidden text-ellipsis whitespace-normal"
          >
            Upload Project Boundary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload-location" className="mt-0 flex-1 p-2">
          <GeoJsonUploader onFileUpload={handleGeoFileUpload} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default StepOneInput;
