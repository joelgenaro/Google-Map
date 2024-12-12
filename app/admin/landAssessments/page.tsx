'use client';
import { LandAssessmentAllProjects } from '@/database/types';
import {
  DeleteButton,
  List,
  ShowButton,
  useTable,
  useModal,
} from '@refinedev/antd';

import { Table, Modal, Button, Upload, message } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { Feature, Polygon } from 'geojson';
import {
  EyeIcon,
  LoaderCircleIcon,
  Trash2Icon,
  UploadIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface FileUrls {
  [key: string]: string;
}

export default function Products() {
  const { tableProps } = useTable<LandAssessmentAllProjects>();
  const [modalContent, setModalContent] = useState<JSX.Element>();
  const { show, close, modalProps } = useModal();
  const [fileUrls, setFileUrls] = useState<FileUrls>({});
  const [loadingUploads, setLoadingUploads] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchFileUrls();
  }, [tableProps.dataSource]);

  const fetchFileUrls = async () => {
    const urls: FileUrls = {};
    for (const record of tableProps.dataSource ?? []) {
      try {
        const response = await fetch(
          `/api/admin/landAssessments/file-exists/${record.id}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.exists) {
          urls[record.id] = data.url;
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    setFileUrls(urls);
  };

  const handleUploadChange = (
    info: UploadChangeParam<UploadFile>,
    recordId: string
  ) => {
    if (info.file.status === 'uploading') {
      setLoadingUploads((prev) => ({ ...prev, [recordId]: true }));
    }
    if (info.file.status === 'done') {
      setLoadingUploads((prev) => ({ ...prev, [recordId]: false }));
      message.success(`${info.file.name} file uploaded successfully`);
      fetchFileUrls(); // Refetch file URLs to update the view
    } else if (info.file.status === 'error') {
      setLoadingUploads((prev) => ({ ...prev, [recordId]: false }));
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleDeleteFile = async (recordId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this file?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          const response = await fetch(
            `/api/admin/landAssessments/file-exists/${recordId}`,
            {
              method: 'DELETE',
            }
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Assuming your API returns a boolean in the response body
          const { isSuccess } = await response.json();
          if (isSuccess) {
            console.log('File delete successful');
            message.success('File deleted successfully');
            // Refresh file URLs to reflect the deletion
            fetchFileUrls();
          } else {
            console.error('Failed to delete file');
            message.error('Failed to delete file');
          }
        } catch (error) {
          console.error('Error deleting file:', error);
          message.error('Failed to delete file');
        }
      },
    });
  };

  const handleButtonClick = (data: any) => {
    if (!data || !data.features) {
      setModalContent(<div>No data found</div>);
      show();
      return;
    }

    const content = (
      <>
        {data.features.map((feature: Feature<Polygon>, index: number) => (
          <div key={index}>
            <strong>Feature {index + 1}</strong> <br />
            <strong>Type:</strong> {feature.type} <br />
            <strong>Feature Type:</strong> {feature.geometry.type} <br />
            <strong>Coordinates:</strong>{' '}
            {JSON.stringify(feature.geometry.coordinates)} <br />
          </div>
        ))}
      </>
    );
    setModalContent(content);
    show();
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={'id'} title="Project ID" />
        <Table.Column dataIndex={'projectName'} title="Project Name" />
        <Table.Column<LandAssessmentAllProjects>
          dataIndex={'carbonMethod'}
          title="Carbon Method"
          key="carbonMethod"
          render={(carbonMethod) => (
            <span>
              {Array.isArray(carbonMethod)
                ? carbonMethod.join(', ')
                : carbonMethod}
            </span>
          )}
        />
        <Table.Column<LandAssessmentAllProjects>
          title="Initial Data"
          dataIndex="initialData"
          key="initialData"
          render={(initialData) => (
            <Button onClick={() => handleButtonClick(JSON.parse(initialData))}>
              View Initial Data
            </Button>
          )}
        />
        <Table.Column<LandAssessmentAllProjects>
          title="Estimate Data"
          dataIndex="estimateData"
          key="estimateData"
          render={(estimateData) => (
            <Button onClick={() => handleButtonClick(JSON.parse(estimateData))}>
              View Estimate Data
            </Button>
          )}
        />
        <Table.Column<LandAssessmentAllProjects>
          title="Exclusion Data"
          dataIndex="exclusionData"
          key="exclusionData"
          render={(exclusionData) => (
            <Button
              onClick={() => handleButtonClick(JSON.parse(exclusionData))}
            >
              View Exclusion Data
            </Button>
          )}
        />
        <Table.Column<LandAssessmentAllProjects>
          title="Report"
          dataIndex="report"
          key="report"
          render={(_, record) => (
            <div className="flex gap-2">
              <Upload
                name="file"
                accept=".pdf"
                action="/api/admin/landAssessments/file-upload"
                data={(file) => ({
                  projectId: record.id,
                  file,
                })}
                beforeUpload={(file) => {
                  // Only allow PDF file uploads
                  const isPDF = file.type === 'application/pdf';
                  if (!isPDF) {
                    message.error('You can only upload PDF file!');
                  }
                  return isPDF || Upload.LIST_IGNORE;
                }}
                onChange={(info) => handleUploadChange(info, record.id)}
                showUploadList={false}
              >
                <Button
                  icon={
                    loadingUploads[record.id] ? (
                      <LoaderCircleIcon className="animate-spin" />
                    ) : (
                      <UploadIcon />
                    )
                  }
                ></Button>
              </Upload>
              {fileUrls[record.id] && (
                <>
                  <Button
                    icon={<EyeIcon />}
                    onClick={() => window.open(fileUrls[record.id], '_blank')}
                  ></Button>
                  <Button
                    icon={<Trash2Icon />} // Assuming you have an icon for delete
                    onClick={() => handleDeleteFile(record.id)}
                    danger
                  ></Button>
                </>
              )}
            </div>
          )}
        />
        <Table.Column<LandAssessmentAllProjects>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <div className="flex gap-2">
              <ShowButton size="small" recordItemId={record.id} />
              <DeleteButton size="small" recordItemId={record.id} />
            </div>
          )}
        />
      </Table>
      <Modal title="Data" {...modalProps} onOk={close}>
        {modalContent}
      </Modal>
    </List>
  );
}
