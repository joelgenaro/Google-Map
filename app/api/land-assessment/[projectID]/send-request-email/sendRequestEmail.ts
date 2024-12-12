import { auth } from '@/auth';
import { env } from '@/env';
import { EmailOptions, sendEmail } from '@/lib/services/email.service';
import { EmailTemplateContext } from '@/lib/types/email.type';
import { compileTemplate } from '@/lib/utils/compile-template';
import { getSignedUrlForGeoJson } from '@/lib/utils/get-signedurl-for-geojson';
import { NextResponse } from 'next/server';

async function getGeoJsonFiles(
  projectID: string
): Promise<{ name: string; url: string }[]> {
  const geoJsonFileNames = [
    'property_boundary.geojson',
    'project_area.geojson',
    'exclusion_zones.geojson',
  ];
  const promises = geoJsonFileNames.map(async (fileName) => {
    const url = await getSignedUrlForGeoJson(`${projectID}/${fileName}`);
    return { name: fileName, url };
  });
  return Promise.all(promises);
}

async function compileEmailTemplate(
  projectID: string,
  userEmail: string,
  geojsonFiles: { name: string; url: string }[]
) {
  const context = {
    projectUUID: projectID,
    userEmail,
    geojsonFiles,
  };
  return compileTemplate(
    'land-assessment-request-report',
    context as EmailTemplateContext['land-assessment-request-report']
  );
}

async function prepareAttachments(
  projectID: string,
  geojsonFiles: { name: string; url: string }[]
) {
  const promises = geojsonFiles.map(async (file) => {
    const response = await fetch(file.url);
    if (!response.ok) throw new Error(`Failed to fetch ${file.url}`);
    const buffer = await response.arrayBuffer();
    return {
      filename: `${projectID}_${file.name}`,
      content: Buffer.from(buffer).toString('base64'),
      encoding: 'base64',
    };
  });
  return Promise.all(promises);
}

export async function SendRequestEmail(req: Request, projectID: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: 'You are not logged in' },
        { status: 401 }
      );
    }

    if (!env.LAND_ASSESSMENT_REQUEST_TO_EMAIL) {
      console.error(
        'LAND_ASSESSMENT_REQUEST_TO_EMAIL is not set in environment variables'
      );
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const geojsonFiles = await getGeoJsonFiles(projectID);
    const html = await compileEmailTemplate(
      projectID,
      session.user.email as string,
      geojsonFiles
    );
    const attachments = await prepareAttachments(projectID, geojsonFiles);

    const emailContext: EmailOptions = {
      to: env.LAND_ASSESSMENT_REQUEST_TO_EMAIL,
      subject: `[AirSeed Technologies] Land Assessment Request Created: ${projectID}`,
      html,
      attachments,
    };

    await sendEmail(emailContext);
    console.log(
      `Email sent successfully to ${emailContext.to} with subject: ${emailContext.subject}`
    );
    return NextResponse.json({ emailContext }, { status: 200 });
  } catch (error) {
    console.error('Failed to send request email:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
