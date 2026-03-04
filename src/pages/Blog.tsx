
import BlogCard from "@/components/blog/BlogCard";
import Footer from "@/components/hotel/Footer";

const SAMPLE_POSTS = [
    {
        id: "1",
        title: "The Future of Luxury Travel: Beyond Earth",
        category: "Space & Tech",
        date: "Oct 24, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        author: {
            name: "Dr. Elena Vosk",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"
        }
    },
    {
        id: "2",
        title: "Hidden Gems of the Pacific: Untouched Paradises",
        category: "Nature",
        date: "Oct 22, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop",
        author: {
            name: "Kai Mako",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
        }
    },
    {
        id: "3",
        title: "Sustainable Stays: A New Era of Eco-Lodge Design",
        category: "Architecture",
        date: "Oct 18, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1518542698889-ca82262f08d5?q=80&w=2544&auto=format&fit=crop",
        author: {
            name: "Sarah Jenks",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop"
        }
    },
    {
        id: "4",
        title: "Culinary Journeys: The Soul of Kyoto",
        category: "Food & Culture",
        date: "Oct 15, 2025",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop",
        author: {
            name: "Hiroshi Tanaka",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop"
        }
    }
];

const Blog = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop"
                        alt="Blog Hero"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background" />
                </div>

                <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase backdrop-blur-md">
                        The Journal
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-foreground drop-shadow-lg">
                        Perspective & <span className="italic text-primary">Lifestyle</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Curated stories for the modern traveler. Explore the unknown, taste the extraordinary, and find your perfect moment.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                    {SAMPLE_POSTS.map((post, index) => (
                        <div key={post.id} className={`${index === 0 || index === 3 ? "lg:col-span-2" : ""}`}>
                            <BlogCard {...post} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-muted/30 border-t border-border">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold">Stay Inspired</h2>
                    <p className="text-muted-foreground">Join our community and get the latest stories delivered to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 h-12 px-6 rounded-full bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                        <button className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Blog;
