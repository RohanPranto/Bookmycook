import SearchBox from "./SearchBox";
import GettingStarted from "./GettingStarted";

function Hero() {
  return (
    <div>
      <div className="hero-div">
        <div className="text-center pt-4 container">
          <h1 className="pt-5"><span>BookMyCook</span></h1>
          <h2 className="pt-3 text-light">Find the best cook near you</h2>
          <SearchBox />
          
        </div>
      </div>
      {/* <CookCards /> */}
      <GettingStarted />
    </div>
  );
}

export default Hero;
