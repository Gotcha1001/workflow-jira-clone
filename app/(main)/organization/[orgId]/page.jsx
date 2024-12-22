
import { getOrganization } from "@/actions/organization";
import OrgSwitcher from "@/components/org-switcher";
import ProjectList from "./_components/projects-list";
import UserIssues from "./_components/user-issues";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MotionWrapperDelay from "@/components/animations/MotionWrapperDelay";

const Organization = async ({ params }) => {

    const { orgId } = params;
    const organization = await getOrganization(orgId)
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    if (!organization) {
        return <div>Organization not found</div>
    }
    return (
        <div className="container mx-auto">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
                <MotionWrapperDelay
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        visible: { opacity: 1, x: 0 },
                    }}
                >
                    <h1 className="text-5xl font-bold gradient-title pb-2">{organization.name}&apos;s Projects</h1>
                </MotionWrapperDelay>
                {/* Org switcher */}
                <OrgSwitcher />
            </div>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, y: -100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <div className="mb-4">
                    <ProjectList orgId={organization.id} />
                </div></MotionWrapperDelay>
            <div className="mb-8">
                <UserIssues userId={userId} />
            </div>
        </div>)
};

export default Organization;
