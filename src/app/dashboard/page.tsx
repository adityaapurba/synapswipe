"use client";
import { ModeToggle } from "../_components/mode-toggle";
import { CreateDeck } from "../_components/create-deck";
import { LeftSidebar } from "../_components/left-sidebar";
import { currentDeckAtom } from "~/store/deck";
import { useRecoilState, useRecoilValue } from "recoil";
import { Cards } from "../_components/cards";
import { isMobileAtom, isSidebarOpenAtom } from "~/store/mesure";
import { Menu, X } from "lucide-react";
import useMobile from "~/hooks/useMobile";
import { Button } from "~/components/ui/button";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import useMouseInside from "~/hooks/useMouseInside";
import { useRef } from "react";

export default function Dashboard() {
  useMobile();
  const navRef = useRef<HTMLDivElement>(null);
  const currentDeck = useRecoilValue(currentDeckAtom);
  const isMobile = useRecoilValue(isMobileAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenAtom);
  useMouseInside(navRef, () => setIsSidebarOpen(true));

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const showContent = isMobile ? !isSidebarOpen : true;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between p-4" ref={navRef}>
        <ModeToggle />
        {isMobile && (
          <Button onClick={toggleSidebar} className="z-20 text-2xl">
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        )}
      </div>
      <div className="flex">
        <LeftSidebar />
        {showContent && (
          <div className={`grow transition-all duration-300`}>
            {!currentDeck && <CreateDeck />}
            {currentDeck && <Cards />}
          </div>
        )}
      </div>
    </div>
  );
}
