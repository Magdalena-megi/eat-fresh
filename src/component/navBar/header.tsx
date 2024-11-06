import { HeaderProps } from "@/types";
import Image from "next/image";

export default function Header({ setCurrentPage }: HeaderProps) {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="w-[150px]"></div>
        <h1 className="text-xl font-bold text-center flex-grow">
          Eat<span className="text-green-800">Fresh</span> Recipe Finder
        </h1>
        <div className="w-[150px] flex justify-end">
          <Image
            src="/EatFreshLogo.png"
            alt="EatFresh Logo"
            width={150}
            height={150}
            className="object-contain cursor-pointer"
            onClick={() => setCurrentPage("home")}
          />
        </div>
      </div>
    </div>
  );
}
