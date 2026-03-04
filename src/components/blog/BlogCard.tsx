import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    title: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: {
        name: string;
        avatar: string;
    };
}

const BlogCard = ({ id, title, category, date, readTime, image, author }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`} className="group relative block w-full h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer">
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
            </div>

            {/* Floating Category Badge */}
            <div className="absolute top-6 left-6 z-20">
                <span className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide bg-white/10 backdrop-blur-xl border border-white/20 text-white uppercase shadow-lg">
                    {category}
                </span>
            </div>

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col gap-4 transform transition-transform duration-500 ease-out translate-y-4 group-hover:translate-y-0">

                {/* Meta Info (Date & Read Time) */}
                <div className="flex items-center gap-4 text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform -translate-y-2 group-hover:translate-y-0">
                    <span>{date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span>{readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-serif font-bold text-white leading-tight group-hover:text-primary-foreground transition-colors duration-300 line-clamp-2">
                    {title}
                </h3>

                {/* Author & Action Row */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 delay-200">
                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-10 h-10 rounded-full border-2 border-white/20 object-cover"
                        />
                        <span className="text-base font-medium text-white/90">{author.name}</span>
                    </div>

                    {/* Read Button */}
                    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 shadow-lg group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Shine Effect on Hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none" />
        </Link>
    );
};

export default BlogCard;
