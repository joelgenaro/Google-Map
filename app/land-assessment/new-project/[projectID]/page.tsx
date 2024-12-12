import NewProjectSecondForm from "@/components/custom/newProjectSecondForm";

export default async function NewProjectSecondStep({
  params,
}: {
  params: { projectID: string };
}) {
  return (
    <div className="w-full h-[calc(100vh-7rem)] lg:h-[calc(100vh-8rem)] pb-8">
      <NewProjectSecondForm projectID={params.projectID} />
    </div>
  );
}
