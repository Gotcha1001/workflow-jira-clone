import { getProject } from '@/actions/projects';
import { notFound } from 'next/navigation';
import SprintBoard from '../_components/sprint-board';
import SprintCreationForm from '../_components/create-sprint';
import MotionWrapperDelay from '@/components/animations/MotionWrapperDelay';

const ProjectPage = async ({ params }) => {
    const { projectId } = await params;

    const project = await getProject(projectId)

    if (!project) {
        notFound()
    }

    return (
        <div className='container mx-auto'>
            {/* 1 Sprint Creation */}
            <SprintCreationForm
                projectTitle={project.name}
                projectId={projectId}
                projectKey={project.key}
                sprintKey={project.sprints?.length + 1}
            />
            {/* 2 Sprint Board */}
            {project.sprints.length > 0 ? (

                <MotionWrapperDelay
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        visible: { opacity: 1, x: 0 },
                    }}
                >
                    <SprintBoard
                        sprints={project.sprints}
                        projectId={projectId}
                        orgId={project.organizationId}
                    />
                </MotionWrapperDelay>
            ) : <div>Create a Sprint from the button above</div>}
        </div >
    )
}

export default ProjectPage