import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MobileAppBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile App Banner */}
        <div
          className={cn(
            "relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900",
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12 lg:p-16">
            {/* Left Side - Image */}
            <div
              className={cn(
                "relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-full group",
                "transition-all duration-1000",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{ transitionDelay: "200ms" }}
            >
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop"
                alt="Travel mobile app"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
              <div
                className={cn(
                  "space-y-4 transition-all duration-1000",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: "400ms" }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
                  Upcoming Mobile App
                </h2>
              </div>

              <p
                className={cn(
                  "text-white/90 text-lg md:text-xl leading-relaxed transition-all duration-1000",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: "600ms" }}
              >
                Experience seamless hotel bookings on the go. Our mobile app brings you exclusive deals, 
                instant confirmations, and personalized recommendations—all in the palm of your hand.
              </p>

              {/* App Store Badges */}
              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-4 transition-all duration-1000",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: "800ms" }}
              >
                <a
                  href="#"
                  className="inline-block transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  aria-label="Download on the App Store"
                >
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 hover:bg-white/20 transition-colors border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-white text-xs leading-tight">Download on the</span>
                      <span className="text-white font-semibold text-sm">App Store</span>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="inline-block transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  aria-label="Get it on Google Play"
                >
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 hover:bg-white/20 transition-colors border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L6.05,21.34L14.54,12.85L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-white text-xs leading-tight">GET IT ON</span>
                      <span className="text-white font-semibold text-sm">Google Play</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppBanner;
