import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airseed - Land Assessment',
  description: 'Airseed Land Assessment',
};

export default function LandAssessmentLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex min-h-screen flex-1 flex-col px-0 pt-28 lg:pt-32">
      {props.children}
    </div>
  );
}
