import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const categories = [
    "Beaches",
    "Hill Stations",
    "Heritage Cities",
    "Wildlife & Nature",
    "Weekend Getaways",
];

const destinations = {
    "Beaches": [
        "Goa hotels", "Varkala hotels", "Gokarna hotels", "Pondicherry hotels",
        "Andaman hotels", "Alibaug hotels", "Kovalam hotels", "Puri hotels",
        "Mahabalipuram hotels", "Digha hotels", "Tarkarli hotels", "Ganpatipule hotels",
        "Marari hotels", "Bekal hotels", "Kannur hotels", "Mangalore hotels",
        "Udupi hotels", "Karwar hotels", "Ratnagiri hotels", "Mandarmani hotels",
        "Lakshadweep hotels", "Havelock hotels", "Neil Island hotels", "Diu hotels",
        "Daman hotels", "Murud hotels", "Kashid hotels", "Diveagar hotels",
        "Dapoli hotels", "Kanyakumari hotels"
    ],
    "Hill Stations": [
        "Ooty hotels", "Munnar hotels", "Manali hotels", "Shimla hotels",
        "Darjeeling hotels", "Coorg hotels", "Nainital hotels", "Mussoorie hotels",
        "Mahabaleshwar hotels", "Gangtok hotels", "Kodaikanal hotels", "Dalhousie hotels",
        "Dharamshala hotels", "McLeod Ganj hotels", "Gulmarg hotels", "Pahalgam hotels",
        "Srinagar hotels", "Leh hotels", "Shillong hotels", "Auli hotels",
        "Mount Abu hotels", "Lonavala hotels", "Khandala hotels", "Matheran hotels",
        "Panchgani hotels", "Wayanad hotels", "Vagamon hotels", "Yercaud hotels",
        "Chikmagalur hotels", "Araku Valley hotels"
    ],
    "Heritage Cities": [
        "Jaipur hotels", "Udaipur hotels", "Varanasi hotels", "Hampi hotels",
        "Mysore hotels", "Agra hotels", "Aurangabad hotels", "Jodhpur hotels",
        "Khajuraho hotels", "Madurai hotels", "Jaisalmer hotels", "Bikaner hotels",
        "Pushkar hotels", "Rishikesh hotels", "Haridwar hotels", "Bodh Gaya hotels",
        "Sanchi hotels", "Thanjavur hotels", "Kanchipuram hotels", "Konark hotels",
        "Kolkata hotels", "Delhi hotels", "Lucknow hotels", "Hyderabad hotels",
        "Bhopal hotels", "Gwalior hotels", "Orchha hotels", "Chitrakoot hotels",
        "Ayodhya hotels", "Badami hotels"
    ],
    "Wildlife & Nature": [
        "Jim Corbett hotels", "Ranthambore hotels", "Kabini hotels", "Kaziranga hotels",
        "Bandhavgarh hotels", "Periyar hotels", "Kanha hotels", "Sundarbans hotels",
        "Gir hotels", "Pench hotels", "Tadoba hotels", "Satpura hotels",
        "Mudumalai hotels", "Bandipur hotels", "Nagarhole hotels", "Manas hotels",
        "Dudhwa hotels", "Panna hotels", "Sariska hotels", "Rajaji hotels",
        "Thekkady hotels", "Dandeli hotels", "Bhadra hotels", "Silent Valley hotels",
        "Valmiki hotels", "Simlipal hotels", "Betla hotels", "Nameri hotels",
        "Orang hotels", "Bharatpur hotels"
    ],
    "Weekend Getaways": [
        "Lonavala hotels", "Rishikesh hotels", "Coorg hotels", "Mahabaleshwar hotels",
        "Chikmagalur hotels", "Pondicherry hotels", "Yercaud hotels", "Kasauli hotels",
        "Alibaug hotels", "Nandi Hills hotels", "Igatpuri hotels", "Karjat hotels",
        "Matheran hotels", "Mulshi hotels", "Pawna hotels", "Lavasa hotels",
        "Neemrana hotels", "Mathura hotels", "Vrindavan hotels", "Lansdowne hotels",
        "Chail hotels", "Shantiniketan hotels", "Sakleshpur hotels", "Bhimtal hotels",
        "Kousani hotels", "Mukteshwar hotels", "Dhanaulti hotels", "Saputara hotels",
        "Silvassa hotels", "Mount Abu hotels"
    ],
};

const PopularWithTravellers = () => {
    const [activeTab, setActiveTab] = useState("Beaches");

    return (
        <section className="py-16 bg-background dark:bg-[#121212]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground dark:text-white mb-2">Popular with travellers</h2>
                    <p className="text-muted-foreground dark:text-gray-400">Curated collections of stays tailored to your travel style.</p>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar items-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-base font-medium whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] border",
                                activeTab === category
                                    ? "bg-primary text-primary-foreground dark:bg-[#FFFBF2] dark:text-[#121212] border-transparent shadow-none"
                                    : "bg-transparent text-muted-foreground dark:text-gray-500 border-transparent hover:text-foreground hover:bg-muted dark:hover:text-gray-300 dark:hover:bg-white/5"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-8 animate-fade-in">
                    {destinations[activeTab as keyof typeof destinations].map((place, index) => (
                        <Link
                            key={index}
                            to={`/search?location=${place.replace(" hotels", "")}`}
                            className="text-[13px] text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors block py-0.5 truncate"
                            title={place}
                        >
                            {place}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularWithTravellers;
