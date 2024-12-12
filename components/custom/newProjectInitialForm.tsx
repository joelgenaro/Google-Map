"use client";

import { useCallback, useState } from "react";
import DrawableMap from "@/components/custom/drawableMap";
import DrawMapMethod from "@/components/custom/drawMapMethod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { landAssessmentNewProjectSchema } from "@/lib/assessment-project-schema";
import toast from "react-hot-toast";
import { handleSaveGeoDataCommon } from "@/lib/api";
import { FeatureCollectionOrNull } from "@/lib/types/mapbox.type";

const url = "/api/land-assessment"; // API url for saving geodata to database

export default function NewProjectInitialForm() {
  const [uploadedData, setUploadedData] =
    useState<FeatureCollectionOrNull>(null);
  const [draw, setDraw] = useState<MapboxDraw | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectNameError, setProjectNameError] = useState("");
  const [clearBoundaries, setClearBoundaries] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleMapLoad = useCallback((draw: MapboxDraw) => {
    setDraw(draw);
  }, []);

  const handleRemoveBoundaries = useCallback(() => {
    setClearBoundaries(true);
    setUploadedData(null);
  }, []);

  const handleSave = useCallback(async (route: string) => {
    setSubmitting(true);
    const additionalData = { projectName: projectName };
  
    try {
      const result = await handleSaveGeoDataCommon(
        session,
        draw,
        uploadedData,
        additionalData,
        url,
        landAssessmentNewProjectSchema,
        "POST"
      );
  
      if (result && result.data) {
        router.push(route);
      }
  
      return result;
    } catch (error) {
      console.error(error);
      // handle error
      toast.error("An error occurred while saving the project. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [session, draw, uploadedData, projectName]);
  
  const handleSaveAndContinue = useCallback(async () => {
    const result = await handleSave(`/land-assessment/new-project/`);
    if (result && result.data) {
      router.push(`/land-assessment/new-project/${result.data.projectID}`);
    }
  }, [handleSave]);
  
  const handleSaveAndExit = useCallback(() => {
    handleSave("/land-assessment");
  }, [handleSave]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1">
        <div className="px-8 pt-16 pb-8">
          <h2 className="text-3xl">New Project</h2>
          <p className="text-sm">
            Project area is generally the boundary of the entire property.
          </p>
          <div className="my-4">
            <Input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setProjectNameError("");
              }}
            />
            {projectNameError && (
              <p className="text-red-500 text-sm">{projectNameError}</p>
            )}
          </div>
          <DrawMapMethod onFileUpload={setUploadedData} />
        </div>
        <DrawableMap
          uploadedData={uploadedData}
          onMapLoad={handleMapLoad}
          clearBoundaries={clearBoundaries}
          onBoundariesCleared={() => setClearBoundaries(false)}
          step={1}
        />
      </div>
      <div className="w-full mt-8 flex justify-between px-16">
        <div className="flex gap-10">
          <Button disabled={submitting} onClick={() => router.back()} className="w-52 h-16 text-xl">Back</Button>
          <Button disabled={submitting} onClick={handleRemoveBoundaries} className="w-52 h-16 text-xl">
              Remove Boundaries
          </Button>
        </div>
        <div className="flex gap-10">
          <Button disabled={submitting} onClick={handleSaveAndExit} className="w-52 h-16 text-xl">Save & Exit</Button>
          <Button disabled={submitting} onClick={handleSaveAndContinue} className="w-52 h-16 text-xl">
            Save and Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
