import Character from "@/assets/images/char.png";
import SplashBg from "@/assets/images/onboarding/splash.png";

const Splash = () => {
  return (
    <div
      className="w-full h-full flex flex-col relative items-center justify-center gap-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${SplashBg})`,
      }}
    >
      <img src={Character} alt="character" className="w-30 h-auto" />
      <div className="text-heading1 font-bold text-primary-font">나풀나풀</div>
    </div>
  );
};

export default Splash;
