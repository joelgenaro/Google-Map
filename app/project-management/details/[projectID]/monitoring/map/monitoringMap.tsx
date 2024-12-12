'use client';
import ReadableFileUploader from '@/components/custom/ProjectManagement/Details/Monitoring/ReadableFileUploader';
import DownloadLink from '@/components/custom/ProjectManagement/Details/Monitoring/SampleFileDownloader';
import { SummaryCard } from '@/components/custom/ProjectManagement/Details/ProjectStatus/summaryCard';
import FunctionalMap from '@/components/custom/functionalMap';
import { InitialMapData } from '@/components/hooks/map/useFunctionalMap';
import { ProjectManagement } from '@/database/types';
import { FileQuestion, LoaderCircleIcon, NotepadText } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MonitoringMap(props: {
  projectManagementData: ProjectManagement;
}) {
  const [mapData, setMapData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialMapData, setInitialMapData] = useState<Array<InitialMapData>>();
  useEffect(() => {
    if (props.projectManagementData) {
      const fetchGeoJson = async () => {
        setIsLoading(true);
        if (!props.projectManagementData.specificationsUrls) {
          console.error('No specifications URL found');
          setIsLoading(false);
          return;
        }
        const fileName = props.projectManagementData.specificationsUrls[0];

        if (!fileName) {
          console.error('File name is not defined');
          setIsLoading(false);
          return;
        }
        const encodedFileName = encodeURIComponent(fileName);

        const response = await fetch(
          `/api/project-management/fetch-geojson?fileName=${encodedFileName}`
        );
        if (!response.ok) {
          console.error('Failed to fetch GeoJSON data');
          setIsLoading(false);
          return;
        }
        const geoJson = await response.json();
        const initData: InitialMapData = {
          data: geoJson,
          style: 'blue',
          boundaryId: geoJson.features[0].id as string,
        };
        setInitialMapData([initData]);
        setIsLoading(false);
      };

      fetchGeoJson();
    }
  }, [props.projectManagementData]);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-grow items-center justify-center">
        <LoaderCircleIcon className="mr-2 h-12 w-12 animate-spin" />
        <span>Loading ...</span>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full gap-8 pb-4">
      <FunctionalMap
        className="flex-1"
        monitoringData={mapData}
        initialMapData={initialMapData}
      />
      <SummaryCard title="Monitoring Data" className="w-96">
        <div className="flex flex-col gap-8 p-4">
          <div>
            <p>
              Some text around what monitoring data is showing and how to
              upload?
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              E.g. For each monitoring period, please upload/infill 2 data
              templates:
            </p>
            <ol className="list-decimal space-y-2 pl-4">
              <li>Plot data (data related to each plot as a whole)</li>
              <li>
                Plant data (data related to each individual plant within each
                plot)
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-4">
            <DownloadLink filename="plot_data_template.xlsx" />
            <ReadableFileUploader onFileUpload={setMapData} />
            <p className="text-center">Or</p>
            <div className="flex w-full justify-between rounded-xl border-2 border-gray-200 bg-gray-200 p-4 text-sm transition-all hover:border-blue-500">
              <div className="flex items-center gap-4">
                <FileQuestion className="text-gray-700" />
                <p>Infill monitoring data template</p>
              </div>
              <NotepadText className="text-gray-700" />
            </div>
          </div>
        </div>
      </SummaryCard>
    </div>
  );
}
