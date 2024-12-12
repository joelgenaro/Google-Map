'use client';

import React, { createContext, useState, useContext } from 'react';
import {
  ProjectManagementDetailActivity,
  ProjectManagementDetailAlert,
  ProjectManagementDetailIssue,
  SelectMonitoringDataWithPlotsAndPlants,
  ProjectManagementMonitoringReport,
  SelectProjectManagementMonitoringData,
  ProjectManagement,
} from '@/database/types';

interface ProjectManagementDetailProps {
  projectManagementData: ProjectManagement | undefined,
  allAlerts: ProjectManagementDetailAlert[];
  fetchAlertsLoading: boolean;
  allIssues: ProjectManagementDetailIssue[];
  fetchIssuesLoading: boolean;
  allActivities: ProjectManagementDetailActivity[];
  fetchActivitiesLoading: boolean;
  allReports: ProjectManagementMonitoringReport[];
  fetchReportsLoading: boolean;
  allMonitoringData: SelectMonitoringDataWithPlotsAndPlants[];
  MonitoringDataList: SelectProjectManagementMonitoringData[];
  selectedMonitoringData: SelectMonitoringDataWithPlotsAndPlants | null;
  fetchMonitoringDataListLoading: boolean;
  fetchMonitoringDataLoading: boolean;
  setProjectManagementData: React.Dispatch<React.SetStateAction<ProjectManagement | undefined>>;
  setAllAlerts: React.Dispatch<
    React.SetStateAction<ProjectManagementDetailAlert[]>
  >;
  setFetchAlertsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAllIssues: React.Dispatch<
    React.SetStateAction<ProjectManagementDetailIssue[]>
  >;
  setFetchIssuesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAllActivities: React.Dispatch<
  React.SetStateAction<ProjectManagementDetailActivity[]>
>;
  setFetchActivitiesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAllReports: React.Dispatch<
    React.SetStateAction<ProjectManagementMonitoringReport[]>
  >;
  setFetchReportsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAllMonitoringData: React.Dispatch<
    React.SetStateAction<SelectMonitoringDataWithPlotsAndPlants[]>
  >;
  setMonitoringDataList: React.Dispatch<
    React.SetStateAction<SelectProjectManagementMonitoringData[]>
  >;
  setSelectedMonitoringData: React.Dispatch<
    React.SetStateAction<SelectMonitoringDataWithPlotsAndPlants | null>
  >;
  setFetchMonitoringDataListLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFetchMonitoringDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectManagementDetail = createContext<
  ProjectManagementDetailProps | undefined
>(undefined);

export const ProjectManagementDetailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projectManagementData, setProjectManagementData] = useState<ProjectManagement>();
  const [allAlerts, setAllAlerts] = useState<ProjectManagementDetailAlert[]>(
    []
  );
  const [fetchAlertsLoading, setFetchAlertsLoading] = useState<boolean>(true);
  const [allIssues, setAllIssues] = useState<ProjectManagementDetailIssue[]>(
    []
  );
  const [fetchIssuesLoading, setFetchIssuesLoading] = useState<boolean>(true);
  const [allActivities, setAllActivities] = useState<ProjectManagementDetailActivity[]>(
    []
  );
  const [fetchActivitiesLoading, setFetchActivitiesLoading] = useState<boolean>(true);
  const [allReports, setAllReports] = useState<ProjectManagementMonitoringReport[]>(
    []
  );
  const [fetchReportsLoading, setFetchReportsLoading] = useState<boolean>(true);
  const [allMonitoringData, setAllMonitoringData] = useState<SelectMonitoringDataWithPlotsAndPlants[]>([]);
  const [MonitoringDataList, setMonitoringDataList] = useState<SelectProjectManagementMonitoringData[]>([]);
  const [selectedMonitoringData, setSelectedMonitoringData] = useState<SelectMonitoringDataWithPlotsAndPlants | null>(null);
  const [fetchMonitoringDataListLoading, setFetchMonitoringDataListLoading] = useState<boolean>(true);
  const [fetchMonitoringDataLoading, setFetchMonitoringDataLoading] = useState<boolean>(false);

  const value = {
    projectManagementData,
    allAlerts,
    fetchAlertsLoading,
    allIssues,
    fetchIssuesLoading,
    allActivities,
    fetchActivitiesLoading,
    allReports,
    fetchReportsLoading,
    allMonitoringData,
    MonitoringDataList,
    selectedMonitoringData,
    fetchMonitoringDataListLoading,
    fetchMonitoringDataLoading,
    setProjectManagementData,
    setAllAlerts,
    setFetchAlertsLoading,
    setAllIssues,
    setFetchIssuesLoading,
    setAllActivities,
    setFetchActivitiesLoading,
    setAllReports,
    setFetchReportsLoading,
    setAllMonitoringData,
    setMonitoringDataList,
    setSelectedMonitoringData,
    setFetchMonitoringDataListLoading,
    setFetchMonitoringDataLoading
  };

  return (
    <ProjectManagementDetail.Provider value={value}>
      {children}
    </ProjectManagementDetail.Provider>
  );
};

export const useProjectManagementDetailsContext =
  (): ProjectManagementDetailProps => {
    const context = useContext(ProjectManagementDetail);
    if (!context) {
      throw new Error('useAlerts must be used within an AlertsProvider');
    }
    return context;
  };
