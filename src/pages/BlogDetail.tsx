import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Calendar as CalendarIcon, User as UserIcon } from "lucide-react";
import Footer from "@/components/hotel/Footer";
import { Button } from "@/components/ui/button";

// Demo data for the blog posts
const BLOG_POSTS: Record<string, {
    title: string;
    subtitle: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    content: React.ReactNode;
}> = {
    "1": {
        title: "The Future of Luxury Travel: Beyond Earth",
        subtitle: "Space tourism is no longer science fiction. Here's what the next decade of orbital hospitality looks like.",
        category: "Space & Tech",
        date: "Oct 24, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        author: {
            name: "Dr. Elena Vosk",
            role: "Aerospace Analyst",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"
        },
        content: (
            <>
                <p>The concept of a "room with a view" is about to be redefined entirely. As private space companies accelerate their capabilities, the next frontier of luxury hospitality isn't a new island resort or a mountain lodge—it's Low Earth Orbit (LEO).</p>

                <h2>The Orbital Experience</h2>
                <p>Imagine waking up to 16 sunrises a day. Zero-gravity yoga sessions with the curvature of the Earth as your backdrop. This isn't just travel; it's a fundamental shift in perspective. Initial designs for orbital hotels focus on 'soft architecture'—padded, womb-like interiors that take advantage of weightlessness rather than fighting it.</p>

                <blockquote>
                    "We are not just exporting a hotel room to space; we are designing a new way for humans to exist, three hundred kilometers above the surface."
                </blockquote>

                <h2>Culinary Challenges & Triumphs</h2>
                <p>Fine dining in zero-g presents unique challenges. Crumbs are a safety hazard, and the sense of smell (and thus taste) is diminished due to fluid shift in the body. Top chefs are currently developing 'hyper-flavorful' textured spheres and encapsulated liquids that explode with flavor, turning dinner into a chemically engineered performance art.</p>

                <h2>Sustainability in the Stars</h2>
                <p>Crucially, the next generation of space tourism is being built with sustainability at its core. Reusable launch vehicles and closed-loop life support systems mean that your carbon footprint for a trip to the stars might soon be comparable to a trans-Atlantic flight.</p>
            </>
        )
    },
    "2": {
        title: "Hidden Gems of the Pacific: Untouched Paradises",
        subtitle: "Far from the influencers and the crowds, these islands offer the true definition of escape.",
        category: "Nature",
        date: "Oct 22, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop",
        author: {
            name: "Kai Mako",
            role: "Travel Photographer",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
        },
        content: (
            <>
                <p>There is a silence that exists only in the middle of the Pacific Ocean. It is not an empty silence, but a heavy, rhythmic one—the sound of waves that have traveled thousands of miles without hitting land, finally finding a shore.</p>

                <h2>The Archipelago of Silence</h2>
                <p>We chartered a small seaplane to reach the Tuamotu Archipelago. From the air, the atolls look like necklaces of turquoise and emerald dropped onto a sheet of deep sapphire glass. Here, "luxury" isn't gold taps and butler service; it's the absolute absence of the modern world.</p>

                <p>We stayed in an eco-lodge built entirely from driftwood and local woven palm. No AC, just the sea breeze. No Wi-Fi, just the connection between your feet and the sand.</p>

                <h2>Under the Surface</h2>
                <p>The true treasure of these islands lies beneath the waterline. The coral reefs here are vibrant, chaotic cities of fish. We spent hours drifting with the current, watching reef sharks patrol the drop-off and manta rays glide by like underwater spaceships.</p>
            </>
        )
    },
    "3": {
        title: "Sustainable Stays: A New Era of Eco-Lodge Design",
        subtitle: "Architecture that doesn't just minimize harm, but actively heals the environment.",
        category: "Architecture",
        date: "Oct 18, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1518542698889-ca82262f08d5?q=80&w=2544&auto=format&fit=crop",
        author: {
            name: "Sarah Jenks",
            role: "Sustainability Architect",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop"
        },
        content: (
            <>
                <p>The era of "greenwashing"—slapping a few solar panels on a concrete block and calling it eco-friendly—is over. The new standard for sustainable hospitality is 'Regenerative Architecture'.</p>

                <h2>Building with the Land</h2>
                <p>In Costa Rica, the new <i>Selva Viva</i> lodge is indistinguishable from the jungle canopy. Bamboo structures are elevated on stilts to protect the forest floor, and the entire resort functions as a water filtration system for the local river.</p>

                <h2>Passive Cooling, Active Comfort</h2>
                <p>Using ancient techniques like the thermal chimney effect and rammed earth walls, these modern marvels maintain a perfect 22°C (72°F) without a single air conditioning unit, even in the sweltering tropics. This is high-tech engineering meeting indigenous wisdom.</p>
            </>
        )
    },
    "4": {
        title: "Culinary Journeys: The Soul of Kyoto",
        subtitle: "Understanding the philosophy of Kaiseki—where every dish is a poem about the season.",
        category: "Food & Culture",
        date: "Oct 15, 2025",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop",
        author: {
            name: "Hiroshi Tanaka",
            role: "Culinary Historian",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop"
        },
        content: (
            <>
                <p>To eat in Kyoto is to consume time itself. The cuisine here, particularly <i>Kaiseki</i>, is hyper-seasonal. You aren't just eating "fish" or "vegetables"; you are eating "early October," specifically.</p>

                <h2>The Art of Subtlety</h2>
                <p>We visited a 400-year-old Ryotei where the chef explained that the flavor of the dashi broth changes slightly depending on the humidity of the day. This level of obsession—this pursuit of perfection—is what defines Kyoto's soul.</p>

                <blockquote>
                    "We do not cook ingredients. We listen to them."
                </blockquote>

                <h2>Silence as a Seasoning</h2>
                <p>The meal was served in a private tatami room overlooking a moss garden. The silence was absolute, broken only by the sound of a bamboo water feature. In this quiet, your senses heighten. The texture of the rice, the temperature of the tea, the glaze on the ceramic bowl—everything becomes significant.</p>
            </>
        )
    }
};

const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();

    // If id is not found or not in our demo data, redirect to blog home
    // In a real app we'd show a 404 or fetch data
    const post = id ? BLOG_POSTS[id] : undefined;

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* Back Navigation Bar - Floating & MacBook/Liquid Style */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-4xl flex items-center justify-between px-6 py-3 rounded-full backdrop-blur-3xl bg-background/60 border border-white/20 shadow-2xl shadow-black/10 transition-all animate-slide-down">
                <Link
                    to="/blog"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                    title="Back to Blog"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="rounded-full h-9 px-4 text-xs font-medium hover:bg-muted/50">Share</Button>
                    <Button size="sm" className="rounded-full h-9 px-6 bg-primary text-primary-foreground font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all">Subscribe</Button>
                </div>
            </div>
            <article>
                {/* Full Width Hero Image */}
                <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover animate-scale-in"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 max-w-7xl mx-auto">
                        <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 text-primary-foreground font-semibold text-xs tracking-wider uppercase">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg max-w-4xl">
                            {post.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed drop-shadow-md">
                            {post.subtitle}
                        </p>
                    </div>
                </div>

                {/* Article Metadata & Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                    {/* Author & Meta Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 border-b border-border mb-12">
                        <div className="flex items-center gap-4">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-14 h-14 rounded-full border-2 border-primary/10 object-cover"
                            />
                            <div>
                                <p className="font-bold text-foreground text-lg">{post.author.name}</p>
                                <p className="text-sm text-muted-foreground">{post.author.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none font-serif leading-loose text-foreground/80 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                        {post.content}
                    </div>

                    {/* Tag Cloud */}
                    <div className="mt-16 pt-8 border-t border-border flex gap-2 flex-wrap">
                        {['Luxury', 'Travel', 'Lifestyle'].map(tag => (
                            <span key={tag} className="px-4 py-1.5 rounded-full bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </article>

            {/* Suggested Read - Simple Next Post Link */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <Link to="/blog" className="block p-8 md:p-12 rounded-3xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border group">
                    <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2 font-medium">Read Next</p>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl md:text-3xl font-serif font-bold group-hover:text-primary transition-colors">Back to all stories</span>
                        <ArrowUpRight className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                </Link>
            </div>

            <Footer />
        </div>
    );
};

export default BlogDetail;
