import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airseed - Land Assessment Detail',
  description: 'Airseed Land Assessment Detail',
};

export default function LandAssessmentDetailLayout(props: {
  children: React.ReactNode;
}) {
  return <div className="mb-6 flex flex-col">{props.children}</div>;
}
