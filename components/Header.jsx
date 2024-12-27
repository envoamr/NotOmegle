import { BsDiscord, BsTelegram, BsSkype, BsLinkedin } from "react-icons/bs";
import { Inter, Saira_Condensed, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", adjustFontFallback: false });
const sairaCondensedBold = Saira_Condensed({
  weight: "700",
  subsets: ["latin"],
  display: "swap", adjustFontFallback: false
});
const sairaCondensed = Saira_Condensed({ weight: "400", subsets: ["latin"], display: "swap", adjustFontFallback: false });
const roboto = Roboto({ weight: "400", subsets: ["latin"], display: "swap", adjustFontFallback: false });

const Header = () => {
  return (
    <header>
      {/* logo motto social online */}
      <div className={`flex justify-center lg:justify-between mx-28 my-4`}>
        {/* logo motto */}
        <div className="flex items-end space-x-20">
          <p
            className={
              sairaCondensedBold.className +
              " cursor-default select-none text-6xl bg-clip-text	"
            }
            style={{
              background:
                "linear-gradient(109.6deg, rgb(66, 240, 233) 34.9%, rgb(252, 255, 26) 82.5%)",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NotOmegle
          </p>
          <p className={sairaCondensed.className + " hidden lg:block text-3xl"}>
            Talk to{" "}
            <span className="line-through text-[#FDE311]">strangers</span>{" "}
            friends
          </p>
        </div>
        {/* social online */}
        <div className="hidden lg:flex flex-col justify-center items-center">
          <div className="flex space-x-2">
            <BsDiscord size="30px" style={{ color: "#7289d9" }} />
            <BsTelegram size="30px" style={{ color: "#0088CC" }} />
            <BsSkype size="30px" style={{ color: "#00aff0" }} />
          </div>
          <p className={sairaCondensed.className + " text-xl"}>
            1,000,000,000+ online
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
