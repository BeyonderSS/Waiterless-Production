import MenuPage from "@/components/MenuPage";
import AddItems from "./Dashboard/AddItems";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";
import FamousFood from "@/components/FamousFood";
import PopularMenu from "@/components/PopularMenu";
import Banner from "@/components/Banner";
import AboutUs from "@/components/AboutUs";
import Feature from "@/components/Feature";

export default function Home() {
  return (
    <main className="scrollbar-none">
      <section>
        <Hero /> {/* Completed */}
      </section>
      {/* <FamousFood/>
      <PopularMenu/> */}
      <section>
        <Banner /> {/* Completed */}
      </section>

      <section>
        <AboutUs /> {/* Completed */}
      </section>
      <section>
        <Feature /> {/* Completed */}
      </section>
      {/* <section>
        <Testimonial /> 
      </section> */}
    </main>
  );
}
