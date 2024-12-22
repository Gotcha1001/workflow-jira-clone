import React from 'react'
import faqs from './faqs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

const Questions = () => {
    return (
        <section className='gradient-background2 py-20 px-5'>
            <div className='container mx-auto'>
                <h3 className='text-3xl font-bold mb-12 text-center'>Frequently Asked Questions</h3>

                <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} className="w-full" value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}


                </Accordion>

            </div>
        </section>
    )
}

export default Questions