import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

type RecordViewerProps = {
  title: string;
  recordUrl: string | null | undefined;
};

const RecordViewer: React.FC<RecordViewerProps> = ({ title, recordUrl }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (recordUrl && recordUrl !== "I don't have this file") {
      fetch(
        `/api/profile/image/get-presigned-url?imageSrcStr=${encodeURIComponent(recordUrl)}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.url) {
            setUrl(data.url);
          } else {
            console.error(data.message);
          }
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [recordUrl]);

  return (
    <>
      <Title level={5}>{title}</Title>
      {recordUrl && recordUrl !== "I don't have this file" ? (
        url ? (
          <Text>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              View File
            </a>
          </Text>
        ) : (
          <Text>Loading...</Text>
        )
      ) : (
        <Text>There is no file to view.</Text>
      )}
    </>
  );
};

export default RecordViewer;
