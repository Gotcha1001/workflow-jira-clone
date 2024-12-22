"use client"
import OrgSwitcher from '@/components/org-switcher'
import { useOrganization, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from '@/app/lib/validators'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/use-fetch'
import { createProject } from '@/actions/projects'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import MotionWrapperDelay from '@/components/animations/MotionWrapperDelay'

const CreateProjectPage = () => {

    const { isLoaded: isOrgLoaded, membership } = useOrganization()
    const { isLoaded: isUserLoaded } = useUser()
    const [isAdmin, setIsAdmin] = useState(false)

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(projectSchema)
    })

    useEffect(() => {
        if (isOrgLoaded && isUserLoaded && membership) {
            setIsAdmin(membership.role === "org:admin")
        }
    }, [isOrgLoaded, isUserLoaded, membership])


    const { data: project, loading, error, fn: createProjectFn } = useFetch(createProject)

    useEffect(() => {
        if (project) {
            toast.success("Project created successfully")
            router.push(`/project/${project.id}`)
        }
    }, [project]) // Depend on 'project' instead of 'loading'


    if (!isOrgLoaded || !isUserLoaded) {
        return null
    }



    const onSubmit = async (data) => {
        createProjectFn(data)
    }



    if (!isAdmin) {
        return (
            <div className='flex flex-col gap-2 items-center'>
                <span className='text-2xl gradient-title'>
                    Oops! Only Admins can create a project
                </span>
                <OrgSwitcher />
            </div>
        )
    }

    return (

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
            <div className='container mx-auto py-10'>
                <MotionWrapperDelay
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    variants={{
                        hidden: { opacity: 0, y: -100 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                    <h1 className='text-6xl text-center font-bold mb-8 gradient-title'>Create new project</h1></MotionWrapperDelay>
                <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            id="name"
                            className="bg-slate-950"
                            placeholder="Project Name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            id="key"
                            className="bg-slate-950"
                            placeholder="Project Key (Ex: RCYT)"
                            {...register("key")}
                        />
                        {errors.key && (
                            <p className='text-red-500 text-sm mt-1'>{errors.key.message}</p>
                        )}
                    </div>
                    <div>
                        <Textarea
                            id="description"
                            className="bg-slate-950 h-28"
                            placeholder="Description"
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>
                        )}
                    </div>
                    <Button
                        disabled={loading}
                        type="submit"
                        size="lg"
                        className="gradient-background2 text-white"
                    >{loading ? "Creating..." : "Create Project"}</Button>
                    {error && (
                        <p className='text-red-500 text-sm mt-1'>{errors.message}</p>
                    )}
                </form>
            </div>
        </MotionWrapperDelay>
    )
}

export default CreateProjectPage