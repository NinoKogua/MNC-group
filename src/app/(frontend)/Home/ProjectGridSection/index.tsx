import React from 'react';
import ProjectFeatureCard from '@/app/(frontend)/components/common/ProjectFeaturedCard';

interface Project {
    title: string;
    description: string;
    image: string;
    isLarge: boolean;
    tags: string;
}

const FEATURED_PROJECTS: Project[] = [
    {
        title: 'ყაზბეგი – რომელიც რჩება წარსულში',
        description: 'ისტორიული 2025 წლის დიზაინი, მაცდური დიზაინით და სრულყოფილი განვითარებით. ყველაფერი მზადაა, თქვენი სურვილის შესაბამისად.',
        image: 'https://cdnb.artstation.com/p/assets/images/images/021/494/213/medium/chayse-russell-render-2.jpg?1571889529',
        isLarge: true,
        tags: 'ისტორიული 2025 წლის დიზაინი',
    },
    {
        title: 'ლაუნჯი',
        description: 'თანამედროვე დიზაინის აუზი და ლამაზი ბუნების ხედი.',
        image: 'https://img.freepik.com/premium-photo/swimming-pool-area-with-beautiful-plant_728905-3413.jpg',
        isLarge: false,
        tags: '',
    },
    {
        title: 'საუნა და სპა',
        description: 'მაღალი კლასის საუნის დიზაინი, სრულყოფილი მომსახურებით და სრული კომფორტით.',
        image: 'https://image.architonic.com/pro2-3/20038947/eden-roc-spa-sauna-pro-g-arcit18.jpg',
        isLarge: false,
        tags: '',
    },
];

export default function ProjectsGridSection() {
    return (
        <section className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-kirovi text-gray-800 mb-4">
                        დასრულებული პროექტები
                    </h2>
                    <p className="text-lg text-gray-600 font-medium max-w-3xl mx-auto">
                        მაღალხარისხიანი დიზაინი, მზად თქვენი განვითარებისთვის
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:auto-rows-fr">
                    <ProjectFeatureCard {...FEATURED_PROJECTS[0]} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <ProjectFeatureCard {...FEATURED_PROJECTS[1]} />
                        <ProjectFeatureCard {...FEATURED_PROJECTS[2]} />
                    </div>
                </div>

            </div>
        </section>
    );
}