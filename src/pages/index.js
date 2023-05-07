import MenuPage from "@/components/MenuPage";
import AddItems from "./AddItems";
import Hero from "../components/Hero"
import Testimonial from "../components/Testimonial"
import FamousFood from "@/components/FamousFood";
import PopularMenu from "@/components/PopularMenu";
import Banner from "@/components/Banner";
import AboutUs from "@/components/AboutUs";
import Feature from "@/components/Feature";

export default function Home() {
  return (
    <main >
      <Hero/>
      <FamousFood/>
      <PopularMenu/>
      <Feature/>
      <AboutUs/>
      <Banner/>
      <Testimonial />
    </main>
  )
}
