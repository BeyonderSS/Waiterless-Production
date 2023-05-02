import MenuPage from "@/components/MenuPage";
import AddItems from "./AddItems";
import Hero from "../components/Hero"
import Testimonial from "../components/Testimonial"
import FamousFood from "@/components/FamousFood";
import PopularMenu from "@/components/PopularMenu";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <main >
      <Hero/>
      <FamousFood/>
      <PopularMenu/>
      <Banner/>
      <Testimonial />
    </main>
  )
}
