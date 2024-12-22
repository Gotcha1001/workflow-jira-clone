import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const ActionCall = () => {
    return (
        <section className=' py-20 text-center px-5'>
            <div className='container mx-auto'>
                <h3 className='text-3xl font-bold mb-6 text-center'>Ready To Transform Your Workflow?</h3>
                <p className='text-xl mb-12'>Join thousands of teams already using WORKFLOW to streamline their projects and boost productivity</p>
                <Link href="/onboarding">
                    <Button size="lg" className="animate-bounce">
                        Start For Free <ArrowRight className='ml-2 h-5 w-5' />
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default ActionCall