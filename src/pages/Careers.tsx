import { ArrowUpRight, Code, Cloud, Layout, Server, Briefcase } from "lucide-react";
import Footer from "@/components/hotel/Footer";
import { Button } from "@/components/ui/button";

const OPEN_POSITIONS = [
    {
        id: "sre",
        title: "Site Reliability Engineer",
        department: "Engineering",
        location: "Remote / New York",
        type: "Full-time",
        icon: Server,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        description: "Build the bedrock of our platform. You'll design scalable systems that can handle millions of users with 99.99% uptime."
    },
    {
        id: "fsd",
        title: "Full Stack Developer",
        department: "Product",
        location: "San Francisco",
        type: "Full-time",
        icon: Code,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        description: "Own features from database to pixel. You'll work with React, Node.js, and everything in between to ship world-class products."
    },
    {
        id: "uiux",
        title: "UI/UX Designer",
        department: "Design",
        location: "London / Remote",
        type: "Full-time",
        icon: Layout,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        description: "Define the visual language of the future. You'll craft intuitive, beautiful interfaces that delight users at every touchpoint."
    },
    {
        id: "cloud",
        title: "Cloud Expert",
        department: "Infrastructure",
        location: "Remote",
        type: "Contract",
        icon: Cloud,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        description: "Architect the skies. You'll optimize our multi-cloud environment for security, performance, and cost-efficiency."
    }
];

const Careers = () => {
    const scrollToOpenings = () => {
        document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
                    <div className="absolute top-40 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10 space-y-8">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase backdrop-blur-md animate-fade-in">
                        We are hiring
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-foreground drop-shadow-sm animate-slide-up">
                        Build the <span className="italic text-primary">Unimaginable</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up stagger-1">
                        Join a team of visionaries, creators, and builders. We're not just creating a platform; we're crafting the future of lifestyle and travel.
                    </p>

                    <div className="flex items-center justify-center gap-4 pt-4 animate-slide-up stagger-2">
                        <Button
                            size="lg"
                            className="rounded-full h-14 px-8 text-lg shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all"
                            onClick={scrollToOpenings}
                        >
                            View Openings
                        </Button>
                    </div>
                </div>
            </section>

            {/* Culture/Values Section */}
            <section className="py-20 bg-muted/30 border-y border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { title: "Radical Ownership", desc: "We don't do micromanagement. You own your work, your impact, and your growth." },
                            { title: "Obsessive Quality", desc: "Good enough is not enough. We sweat the details that others ignore." },
                            { title: "Infinite Curiosity", desc: "We ask 'why' and 'what if' constantly. Learning is our default state." }
                        ].map((value, i) => (
                            <div key={i} className="p-8 rounded-3xl hover:bg-background/80 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-border/50 group">
                                <h3 className="text-2xl font-bold mb-4 font-serif group-hover:text-primary transition-colors">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="openings">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-serif font-bold mb-2">Open Positions</h2>
                        <p className="text-muted-foreground">Come do the best work of your life.</p>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground hidden sm:block">
                        {OPEN_POSITIONS.length} active roles
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {OPEN_POSITIONS.map((role, index) => (
                        <div
                            key={role.id}
                            className="group relative p-6 sm:p-8 rounded-[2rem] bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                <div className="flex items-start gap-6">
                                    <div className={`p-4 rounded-2xl ${role.bg} ${role.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <role.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{role.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">{role.department}</span>
                                            <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">{role.location}</span>
                                            <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">{role.type}</span>
                                        </div>
                                        <p className="text-muted-foreground max-w-2xl">{role.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 self-start md:self-center">
                                    <span className="text-sm font-semibold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Apply Now</span>
                                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 shadow-sm">
                                        <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits/Perks Teaser */}
            <section className="py-20 relative overflow-hidden bg-primary text-primary-foreground">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
                    <Briefcase className="w-12 h-12 mx-auto opacity-80" />
                    <h2 className="text-3xl md:text-5xl font-serif font-bold">More than just a job.</h2>
                    <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                        Comprehensive health, equity packages, unlimited PTO, and annual company retreats to places you've only dreamed of.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Careers;
