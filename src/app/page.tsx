import Categories from "@/components/home/Categories";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import Hero from "@/components/home/Hero";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedStudios />
      <Categories />
      <HowItWorks />
      <HostGuarantee />
    </>
  );
}
