import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Header() {
  return (
    <header className="fixed z-50 left-1/2 transform -translate-x-1/2 -translate-y-[-24px] max-w-[500px] w-full backdrop-blur-md bg-white/30 rounded-[15px] px-[14px] py-[7px]">
      <div className="flex gap-[20px] justify-between">
        <ModeToggle />
        <nav>
          <ul className="flex justify-between items-center gap-[20px] h-full text">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/portfolio">Portfolio</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
