import ProjectCard from '../ProjectCard';

const sampleProject = {
    mainImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/602621054.jpg?k=ddc9a6243bed9bffc3242119df1a36eb3feadf291164bf50496aa28492d05911&o=&hp=1',
    smallImages: [
        'https://hotsale.ge/files/offers/offinkazbegi/2.jpg',
        'https://hotsale.ge/files/offers/datvianirancho/1.jpg',
        'https://geziyoo.co/blog/wp-content/uploads/2023/08/Aybelya-Tatil-Koyu-2.jpg',
        'https://image.hurimg.com/i/hurriyet/75/0x0/5f7b08eb2269a2117c250804.jpg',
    ],
    title: 'ფიჭვები რეზიდენციები',
    description: 'თქვენს განკარგულებაშია საუკეთესოდ მოწყობილი, მთლიანად მოწყობილი საცხოვრებელი სახლი. ჩვენ გთავაზობთ სრულყოფილ სერვისს, მშენებლობიდან სახლის სრულ მოწყობამდე, რომლის სრულფასოვანი ცხოვრებაც შესაძლებელია პირველივე დღიდან.',
    details: [
        { label: 'საძინებელი', value: '4', unit: '' },
        { label: 'აშენდა', value: '2023', unit: '' },
        { label: 'სართულები', value: '2', unit: '' },
        { label: 'სააბაზანო', value: '1', unit: 'ცალი' },
        { label: 'კვადრატულობა', value: '1,024', unit: 'M²' },
    ],
    price: '123,500',
};

export default function ProjectSection() {
    return (
        <section className="bg-beige-50 py-12 lg:py-16">
            <div className="max-w-[1440px] mx-auto px-4">

                {/* სათაურის ბლოკი */}
                <div className="text-center mb-6 lg:mb-8">
                    <h2 className="text-4xl font-kirovi font-extrabold text-gray-800 mb-4">
                        ჩვენი პროექტები
                    </h2>
                    <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                        თანამედროვე არქიტექტურით და ეკოლოგიურად სუფთა მასალით
                    </p>
                </div>

                {/* პროექტის ბარათი */}
                <ProjectCard project={sampleProject} />

            </div>
        </section>
    );
}
