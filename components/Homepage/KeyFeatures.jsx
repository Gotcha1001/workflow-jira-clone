import React from 'react';
import features from "./features";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import FeatureMotionWrapper from '../animations/FeatureMotionWrapperMap';


const KeyFeatures = () => {
    return (
        <section id="features" className='gradient-background2 py-20 px-5'>
            <div className='container mx-auto'>
                <h3 className='text-3xl font-bold mb-12 text-center'>Key Features</h3>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {features.map((feature, index) => {
                        return (
                            <FeatureMotionWrapper key={index} index={index}>
                                <Card className="bg-gradient-to-r from-purple-800 via-indigo-700 to-gray-800">

                                    <CardContent className="pt-6">
                                        <feature.icon className="h-12 w-12 mb-4 text-indigo-300" />
                                        <h4 className='text-xl font-semibold mb-2'>{feature.title}</h4>
                                        <p className='text-gray-400'>{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </FeatureMotionWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
