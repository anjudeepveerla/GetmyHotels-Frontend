import HotelHeroSection from "@/components/hotel/HotelHeroSection";
import DealsOfTheDay from "@/components/hotel/DealsOfTheDay";
import TrendingDestinations from "@/components/hotel/TrendingDestinations";
import ExploreByCity from "@/components/hotel/ExploreByCity";
import MobileAppBanner from "@/components/hotel/MobileAppBanner";
import TrustValueCards from "@/components/hotel/TrustValueCards";
import Footer from "@/components/hotel/Footer";

import ExploreByExperience from "@/components/hotel/ExploreByExperience";
import PopularWithTravellers from "@/components/hotel/PopularWithTravellers";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HotelHeroSection />
      <DealsOfTheDay />
      <ExploreByCity />
      <TrendingDestinations />
      <ExploreByExperience />
      <PopularWithTravellers />
      <MobileAppBanner />
      <TrustValueCards />
      <Footer />
    </div>
  );
};

export default Index;
