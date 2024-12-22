// _components/user-issues.js
import { getUserIssues } from '@/actions/issues'
import FeatureMotionWrapper from '@/components/animations/FeatureMotionWrapperMap'
import IssueCard from '@/components/issue-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { Suspense } from 'react'

const UserIssues = async ({ userId }) => {
    console.log("UserIssues component rendered with userId:", userId);

    if (!userId) {
        console.log("No userId provided");
        return null;
    }

    const issues = await getUserIssues(userId);
    console.log("Fetched issues:", issues);

    if (!issues || issues.length === 0) {
        console.log("No issues found");
        return (
            <div className="text-center py-4">
                <h1 className='text-4xl font-bold gradient-title mb-4'>My Issues</h1>
                <p>No issues found.</p>
            </div>
        );
    }

    const assignedIssues = issues.filter((issue) => {
        console.log("Checking assigned issue:", {
            issueId: issue.id,
            assigneeId: issue.assignee?.clerkUserId,
            userId: userId
        });
        return issue.assignee?.clerkUserId === userId;
    });

    const reportedIssues = issues.filter((issue) => {
        console.log("Checking reported issue:", {
            issueId: issue.id,
            reporterId: issue.reporter?.clerkUserId,
            userId: userId
        });
        return issue.reporter?.clerkUserId === userId;
    });

    console.log("Filtered issues:", {
        assigned: assignedIssues.length,
        reported: reportedIssues.length
    });

    return (
        <>
            <h1 className='text-4xl font-bold gradient-title mb-4'>My Issues</h1>
            <Tabs defaultValue="assigned" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="assigned">
                        Assigned To You ({assignedIssues.length})
                    </TabsTrigger>
                    <TabsTrigger value="reported">
                        Reported By You ({reportedIssues.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="assigned">
                    <Suspense fallback={<div>Loading...</div>}>
                        <IssueGrid issues={assignedIssues} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="reported">
                    <Suspense fallback={<div>Loading...</div>}>
                        <IssueGrid issues={reportedIssues} />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </>
    );
}

function IssueGrid({ issues }) {
    if (!issues || issues.length === 0) {
        return <p className="text-center py-4">No issues found.</p>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {issues.map((issue, index) => (
                <FeatureMotionWrapper key={issue.id} index={index}>
                    <IssueCard issue={issue} showStatus />
                </FeatureMotionWrapper>
            ))}
        </div>
    );
}

export default UserIssues;