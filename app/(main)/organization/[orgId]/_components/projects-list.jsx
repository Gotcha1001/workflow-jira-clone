import { getProjects } from "@/actions/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteProject from "./delete-project";

export default async function ProjectList({ orgId }) {
    //1 get the projects from the action and pass the params
    const projects = await getProjects(orgId);
    //2. if no projects send a link to create and message
    if (projects.length === 0) {
        return (
            <p>
                No Projects Found.{" "}
                <Link
                    className="underline underline-offset-2 text-indigo-500"
                    href="/project/create"
                >
                    Create New
                </Link>
            </p>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => {
                return (
                    <Card key={project.id}>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">{project.name}
                                <DeleteProject projectId={project.id} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500 mb-4">{project.description}</p>
                            <Link
                                className="text-indigo-500 hover:underline"
                                href={`/project/${project.id}`}
                            >
                                View Project
                            </Link>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
