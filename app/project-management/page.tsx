import ProjectManagementList from "@/components/custom/projectManagementList";

export default function ProjectManagementPage() {
  return (
    <div className="w-full">
      <div className="flex min-h-[calc(100vh-7rem)] w-full flex-col pb-8 lg:min-h-[calc(100vh-8rem)]">
        <ProjectManagementList />
      </div>
    </div>
  );
}
