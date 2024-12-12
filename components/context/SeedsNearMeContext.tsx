import { LandAssessmentNewProject } from '@/database/types';
import { Result } from '@mapbox/mapbox-gl-geocoder';
import { FeatureCollection } from 'geojson';
import { Session } from 'next-auth';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SeedSpeciesData } from '../hooks/useSeedsSpeciesData';

interface SeedsNearMeContextType {
  session: Session | null;
  setSession: (data: Session | null) => void;
  // For Step 1 - Project Selection
  projectsData: LandAssessmentNewProject[];
  setProjectsData: (data: LandAssessmentNewProject[]) => void;
  selectedProjectToLink: string;
  setSelectedProjectToLink: (data: string) => void;
  geoJsonData: FeatureCollection | null;
  setGeoJsonData: (data: FeatureCollection | null) => void;
  addressData: Result | null;
  setAddressData: (data: Result | null) => void;
  // For Step 2 - Seed Request Form
  seedsRequiredDate: Date | undefined;
  setSeedsRequiredDate: (date: Date | undefined) => void;
  seedTreatment: boolean;
  setSeedTreatment: (data: boolean) => void;
  seedViability: boolean;
  setSeedViability: (data: boolean) => void;
  seedProvenance: boolean;
  setSeedProvenance: (data: boolean) => void;
  seedsRequestData: SeedSpeciesData[];
  setSeedsRequestData: (data: SeedSpeciesData[]) => void;
  missingQuantity: boolean;
  setMissingQuantity: (value: boolean) => void;
  // For Reset Context and other functions
  resetContext: () => void;
  resetContextDisabled: boolean;
  setResetContextDisabled: (data: boolean) => void;
}

const defaultContextValue: SeedsNearMeContextType = {
  session: null,
  setSession: () => {},
  // For Step 1 - Project Selection
  projectsData: [],
  setProjectsData: () => {},
  selectedProjectToLink: '',
  setSelectedProjectToLink: () => {},
  geoJsonData: null,
  setGeoJsonData: () => {},
  addressData: null,
  setAddressData: () => {},
  // For Step 2 - Seed Request Form
  seedsRequiredDate: undefined,
  setSeedsRequiredDate: () => {},
  seedTreatment: false,
  setSeedTreatment: () => {},
  seedViability: false,
  setSeedViability: () => {},
  seedProvenance: false,
  setSeedProvenance: () => {},
  seedsRequestData: [],
  setSeedsRequestData: () => {},
  missingQuantity: false,
  setMissingQuantity: () => {},
  // For Reset Context and other functions
  resetContext: () => {},
  resetContextDisabled: true,
  setResetContextDisabled: () => {},
};

export const SeedsNearMeContext =
  createContext<SeedsNearMeContextType>(defaultContextValue);

export const useSeedsNearMeContext = () => useContext(SeedsNearMeContext);

type SeedsNearMeProviderProps = {
  children: ReactNode;
};

export const SeedsNearMeProvider = ({ children }: SeedsNearMeProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  // For Step 1 - Project Selection
  const [projectsData, setProjectsData] = useState<LandAssessmentNewProject[]>(
    []
  );
  const [selectedProjectToLink, setSelectedProjectToLink] =
    useState<string>('');
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(
    null
  );
  const [addressData, setAddressData] = useState<Result | null>(null);
  // For Step 2 - Seed Request Form
  const [seedsRequiredDate, setSeedsRequiredDate] = useState<Date | undefined>(
    new Date()
  );
  const [seedTreatment, setSeedTreatment] = useState<boolean>(false);
  const [seedViability, setSeedViability] = useState<boolean>(false);
  const [seedProvenance, setSeedProvenance] = useState<boolean>(false);
  const [seedsRequestData, setSeedsRequestData] = useState<SeedSpeciesData[]>(
    []
  );
  const [missingQuantity, setMissingQuantity] = useState(false);
  // For Reset Context and other functions
  const [resetContextDisabled, setResetContextDisabled] =
    useState<boolean>(true);

  const resetContext = () => {
    setProjectsData([]);
    setSelectedProjectToLink('');
    setGeoJsonData(null);
    setAddressData(null);
    setSeedsRequiredDate(new Date());
    setSeedTreatment(false);
    setSeedViability(false);
    setSeedProvenance(false);
    setSeedsRequestData([]);
  };

  useEffect(() => {
    if (selectedProjectToLink || geoJsonData || addressData) {
      setResetContextDisabled(false);
    } else if (!selectedProjectToLink && !geoJsonData && !addressData) {
      setResetContextDisabled(true);
    }
  }, [selectedProjectToLink, geoJsonData, addressData]);

  useEffect(() => {
    const projectData = projectsData.find(
      (item) => item.id === selectedProjectToLink
    );
    setGeoJsonData(projectData?.data as FeatureCollection);
  }, [projectsData, selectedProjectToLink]);

  const value = {
    session,
    setSession,
    // For Step 1 - Project Selection
    projectsData,
    setProjectsData,
    selectedProjectToLink,
    setSelectedProjectToLink,
    geoJsonData,
    setGeoJsonData,
    addressData,
    setAddressData,
    // For Step 2 - Seed Request Form
    seedsRequiredDate,
    setSeedsRequiredDate,
    seedTreatment,
    setSeedTreatment,
    seedViability,
    setSeedViability,
    seedProvenance,
    setSeedProvenance,
    seedsRequestData,
    setSeedsRequestData,
    missingQuantity,
    setMissingQuantity,
    // For Reset Context and other functions
    resetContext,
    resetContextDisabled,
    setResetContextDisabled,
  };

  return (
    <SeedsNearMeContext.Provider value={value}>
      {children}
    </SeedsNearMeContext.Provider>
  );
};
