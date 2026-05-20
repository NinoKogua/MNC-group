import UpArrowIcon from '@/app/assets/icons/UpArrow';
import SecondHomeIcon from '@/app/assets/icons/SecondHome';
import CoinsIcon from '@/app/assets/icons/Coins';
import BankIcon from '@/app/assets/icons/Bank';
import ProcessCard from '../ProcessCard';

const PROCESS_STEPS = [
    {
        number: '01',
        title: 'ფინანსური მხარდაჭერა',
        description: 'მიიღეთ თქვენი თანხის 30% ბონუსით',
        icon: UpArrowIcon,
    },
    {
        number: '02',
        title: 'ბანკის პარტნიორობა',
        description: 'ვიყენებთ საუკეთესო ბანკების საუკეთესო ვადებს',
        icon: CoinsIcon,
    },
    {
        number: '03',
        title: 'განვადება',
        description: '24 თვიანი უპროცენტო განვადება',
        icon: BankIcon,
    },
    {
        number: '04',
        title: 'ფინანსური გარიგება',
        description: 'ავიღოთ და დავეხმაროთ თქვენს ოცნებას',
        icon: SecondHomeIcon,
    },
];


export default function infoCardsGrid() {
    return (
        <div className="mt-8 md:mt-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12 font-kirovi">
                შეძენის პირობები
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROCESS_STEPS.map((step, index) => (
                    <ProcessCard
                        key={step.number}
                        {...step}
                        isLast={index === PROCESS_STEPS.length - 1}
                    />
                ))}
            </div>

            <div className="text-center mt-8">
                <button className="text-green-700 text-lg font-bold underline hover:text-green-primary transition-colors">
                    სრულად ნახვა
                </button>
            </div>
        </div>
    )
};