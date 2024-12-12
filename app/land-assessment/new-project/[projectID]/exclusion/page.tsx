import NewProjectThirdForm from '@/components/custom/newProjectThirdForm';

const NewProjectThirdStep = ({ params }: { params: { projectID: string } }) => {
  return (
    <div className="h-[calc(100vh-7rem)] w-full pb-8 lg:h-[calc(100vh-8rem)]">
      <NewProjectThirdForm projectID={params.projectID} />
    </div>
  );
};

export default NewProjectThirdStep;
