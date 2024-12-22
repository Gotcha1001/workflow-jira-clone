"use server";
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createProject(data) {
  const { userId, orgId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!orgId) {
    throw new Error("No Organization Selected");
  }

  const { data: membership } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userMembership = membership.find(
    (member) => member.publicUserData.userId === userId
  );

  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organization admins can create projects");
  }

  // Check if a project with the same organizationId and key already exists
  const existingProject = await db.project.findUnique({
    where: {
      organizationId_key: {
        organizationId: orgId,
        key: data.key,
      },
    },
  });

  if (existingProject) {
    throw new Error(
      "A project with this key already exists in the organization."
    );
  }

  //logic for creating the project
  try {
    const project = await db.project.create({
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
        organizationId: orgId,
      },
    });
    return project;
  } catch (error) {
    throw new Error("Error creating project:" + error.message);
  }
}

export async function getProjects(orgIdFromParams) {
  // 1. Take the user ID from the auth and handle errors
  const { userId, orgId: orgIdFromAuth } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // 2. Check if the user exists in the database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 3. Use the orgId provided as a parameter if it exists; otherwise, use the one from auth
  const effectiveOrgId = orgIdFromParams || orgIdFromAuth;

  if (!effectiveOrgId) {
    throw new Error("Organization ID not provided or found");
  }

  // 4. Fetch all projects for the organization
  const projects = await db.project.findMany({
    where: { organizationId: effectiveOrgId },
    orderBy: { createdAt: "desc" },
  });

  // 5. Return projects
  return projects;
}

export async function deleteProject(projectId) {
  //1. from auth take out the
  const { userId, orgId, orgRole } = auth();
  //2 Null checks
  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }
  //3 another check and message
  if (orgRole !== "org:admin") {
    throw new Error("Only organization Admins can delete projects");
  }
  //4. find that project with the id we getting in the params
  const project = await db.project.findUnique({
    where: { id: projectId },
  });
  //5. after finding it, check again
  if (!project || project.organizationId !== orgId) {
    throw new Error(
      "Project not found or you dont have permission to delete it"
    );
  }
  //6 delete logic
  await db.project.delete({
    where: { id: projectId },
  });

  //7. if all god
  return { success: true };
}

export async function getProject(projectId) {
  //1. from auth take out the
  const { userId, orgId } = auth();

  //2 Null checks
  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  // 3. Check if the user exists in the database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }
  //4 find the projects
  const project = await db.project.findUnique({
    where: { id: projectId },
    include: {
      sprints: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) {
    return null;
  }
  // Verify project belongs to the organization
  if (project.organizationId !== orgId) {
    return null;
  }
  return project;
}
