import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full max-w-xl mx-auto my-20">
            <Carousel className="flex flex-wrap justify-center items-center">
                <CarouselPrevious className="self-center" />
                <CarouselContent className="flex w-full">
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="w-full rounded-full">
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselNext className="self-center" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;
