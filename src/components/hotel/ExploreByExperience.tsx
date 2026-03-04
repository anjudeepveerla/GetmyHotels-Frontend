import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// Define Data Types
type CategoryId = "Beaches" | "Hill Stations" | "Heritage Cities" | "Wildlife & Nature" | "Weekend Getaways";

interface Destination {
    id: string;
    name: string;
    subtitle: string;
    image: string;
}

// Data
// Data
const categories: CategoryId[] = [
    "Beaches",
    "Hill Stations",
    "Heritage Cities",
    "Wildlife & Nature",
    "Weekend Getaways",
];

const destinationsData: Record<CategoryId, Destination[]> = {
    "Beaches": [
        { id: "b1", name: "Maldives", subtitle: "120+ stays", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=800&fit=crop" },
        { id: "b2", name: "Bora Bora", subtitle: "85+ stays", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&h=800&fit=crop" },
        { id: "b3", name: "Maui", subtitle: "90+ stays", image: "https://images.unsplash.com/photo-1590523741831-ab7f851093f8?w=800&h=800&fit=crop" },
        { id: "b4", name: "Seychelles", subtitle: "60+ stays", image: "https://images.unsplash.com/photo-1582234057635-f4812a1bd7d0?w=800&h=800&fit=crop" },
        { id: "b5", name: "Fiji", subtitle: "75+ stays", image: "https://images.unsplash.com/photo-1596482186717-37a54497743d?w=800&h=800&fit=crop" },
    ],
    "Hill Stations": [
        { id: "h1", name: "Manali", subtitle: "200+ stays", image: "https://images.unsplash.com/photo-1571474004502-c1847688ce99?w=800&h=800&fit=crop" },
        { id: "h2", name: "Ooty", subtitle: "150+ stays", image: "https://images.unsplash.com/photo-1572099606223-bd71a3c7f694?w=800&h=800&fit=crop" },
        { id: "h3", name: "Shimla", subtitle: "180+ stays", image: "https://images.unsplash.com/photo-1620038896014-a95c378e9990?w=800&h=800&fit=crop" },
        { id: "h4", name: "Munnar", subtitle: "140+ stays", image: "https://images.unsplash.com/photo-1622301985392-41144c925827?w=800&h=800&fit=crop" },
        { id: "h5", name: "Darjeeling", subtitle: "110+ stays", image: "https://images.unsplash.com/photo-1571994646700-111077759c99?w=800&h=800&fit=crop" },
    ],
    "Heritage Cities": [
        { id: "hc1", name: "Jaipur", subtitle: "300+ stays", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=800&fit=crop" },
        { id: "hc2", name: "Udaipur", subtitle: "250+ stays", image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800&h=800&fit=crop" },
        { id: "hc3", name: "Varanasi", subtitle: "190+ stays", image: "https://images.unsplash.com/photo-1563214876-02dc217c37cd?w=800&h=800&fit=crop" },
        { id: "hc4", name: "Hampi", subtitle: "80+ stays", image: "https://images.unsplash.com/photo-1600100418386-b4f0b2a7585f?w=800&h=800&fit=crop" },
        { id: "hc5", name: "Mysore", subtitle: "100+ stays", image: "https://images.unsplash.com/photo-1555675409-4099710375cd?w=800&h=800&fit=crop" },
    ],
    "Wildlife & Nature": [
        { id: "w1", name: "Ranthambore", subtitle: "50+ stays", image: "https://images.unsplash.com/photo-1567116812891-b0db37000dfb?w=800&h=800&fit=crop" },
        { id: "w2", name: "Jim Corbett", subtitle: "90+ stays", image: "https://images.unsplash.com/photo-1527788320499-563605e55b6a?w=800&h=800&fit=crop" },
        { id: "w3", name: "Kaziranga", subtitle: "40+ stays", image: "https://images.unsplash.com/photo-1534177616072-ef7dc12044f9?w=800&h=800&fit=crop" },
        { id: "w4", name: "Sundarbans", subtitle: "30+ stays", image: "https://images.unsplash.com/photo-1536640822690-34ae24867137?w=800&h=800&fit=crop" },
        { id: "w5", name: "Gir", subtitle: "45+ stays", image: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=800&h=800&fit=crop" },
    ],
    "Weekend Getaways": [
        { id: "wg1", name: "Lonavala", subtitle: "150+ stays", image: "https://images.unsplash.com/photo-1582260656041-3d74c2e68c92?w=800&h=800&fit=crop" },
        { id: "wg2", name: "Coorg", subtitle: "120+ stays", image: "https://images.unsplash.com/photo-1596395818858-2900c5c7d819?w=800&h=800&fit=crop" },
        { id: "wg3", name: "Rishikesh", subtitle: "200+ stays", image: "https://images.unsplash.com/photo-1599824286129-ba9a022b7a97?w=800&h=800&fit=crop" },
        { id: "wg4", name: "Pondicherry", subtitle: "130+ stays", image: "https://images.unsplash.com/photo-1616440263546-2b4740e532b2?w=800&h=800&fit=crop" },
        { id: "wg5", name: "Mahabaleshwar", subtitle: "100+ stays", image: "https://images.unsplash.com/photo-1627885743497-28f090d965e6?w=800&h=800&fit=crop" },
    ],
};

const ExploreByExperience = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>("Beaches");

    // Fallback for framer-motion unique keys if it's not installed or configured, 
    // but we'll try to use standard React state + CSS transition classes for reliability too.

    return (
        <section className="py-20 md:py-32 bg-background dark:bg-background overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground dark:text-foreground mb-4 tracking-tight">
                            Explore by Experience
                        </h2>
                        <p className="text-muted-foreground dark:text-muted-foreground text-lg font-light leading-relaxed">
                            Curated collections of stays tailored to your travel style.
                        </p>
                    </div>

                    {/* Category Pills - Individual Capsules (No Container) */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden",
                                    "border border-border/40 shadow-sm",
                                    activeCategory === category
                                        ? "text-primary-foreground bg-primary shadow-md scale-105 border-primary"
                                        : "text-muted-foreground bg-background hover:bg-secondary/50 hover:text-foreground hover:border-border"
                                )}
                            >
                                <span className="relative z-10">{category}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards Grid */}
                <div
                    key={activeCategory}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 animate-in fade-in zoom-in-95 duration-500 fill-mode-forwards"
                >
                    {destinationsData[activeCategory].map((dest, index) => (
                        <div
                            key={`${activeCategory}-${dest.id}`}
                            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            {/* Background Image */}
                            <img
                                src={dest.image}
                                alt={dest.name}
                                loading="eager"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
                            />

                            {/* Minimal Gradient */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold text-white mb-1.5 tracking-wide drop-shadow-md transform transition-transform duration-500 group-hover:-translate-y-1">
                                    {dest.name}
                                </h3>
                                {/* Stays Count - Reveal on Hover */}
                                <p className="text-white/90 text-sm font-medium tracking-wide drop-shadow-sm transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                    {dest.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreByExperience;
