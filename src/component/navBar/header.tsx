import { HeaderProps } from "@/types";
import Image from "next/image";

export default function Header({ setCurrentPage }: HeaderProps) {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-1 flex justify-between items-center">
        <div className="w-[60px] md:w-[120px]"></div>
        <h1 className="text-lg md:text-xl font-bold text-center flex-grow">
          Eat<span className="text-green-800">Fresh</span> Recipe Finder
        </h1>
        <div className="w-[60px] md:w-[120px] flex justify-end">
          <Image
            src="/EatFreshLogo.png"
            alt="EatFresh Logo"
            width={60}
            height={60}
            className="object-contain cursor-pointer md:w-[120px] md:h-[120px]"
            onClick={() => setCurrentPage("home")}
          />
        </div>
      </div>
    </div>
  );
}
