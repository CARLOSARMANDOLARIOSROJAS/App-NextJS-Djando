"use client";

import Link from "next/link";
import { NavTexts } from "../helpers/texts";
import { Button } from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUserName } from "@/actions/loginActions";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // o usa íconos de tu preferencia

interface NavProps {
  search: string;
  setSearch: (search: string) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Nav = (Props: NavProps) => {
  const { search, setSearch, handleKeyDown } = Props;
  const dispatch = useDispatch();
  const idUser = useSelector((state: RootState) => state.auth.user?.id);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    dispatch(setUserName(null));
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-black p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold m-2">{NavTexts.title}</h1>

        {/* Hamburger Button (solo visible en mobile) */}
        <button onClick={toggleMenu} className="sm:hidden text-white focus:outline-none">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú (desktop) */}
        <ul className="hidden sm:flex justify-center items-center gap-4 mr-10">
          {idUser ? (
            <li>
              <Button
                onClick={handleLogout}
                label={NavTexts.logOut}
                class="text-gray-200 hover:text-white bg-transparent border-none cursor-pointer"
              />
            </li>
          ) : (
            <li>
              <Link href="/login" className="text-gray-200 hover:text-white">
                Login
              </Link>
            </li>
          )}
          {idUser && (
            <li>
              <Link href="/create" className="text-gray-200 hover:text-white">
                Create
              </Link>
            </li>
          )}
          <li>
            <input
              type="text"
              className="p-2 rounded bg-gray-700 text-white"
              placeholder={NavTexts.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </li>
        </ul>
      </div>

      {/* Menú móvil colapsable */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col justify-items-start items-center gap-3 px-4 mt-4">
          {idUser ? (
            <Button
              onClick={handleLogout}
              label={NavTexts.logOut}
              class="text-gray-200 hover:text-white bg-transparent border-none cursor-pointer"
            />
          ) : (
            <Link href="/login" className="text-gray-200 hover:text-white">
              Login
            </Link>
          )}
          {idUser && (
            <Link href="/create" className="text-gray-200 hover:text-white">
              Create
            </Link>
          )}
          <input
            type="text"
            className="p-2 rounded bg-gray-700 text-white"
            placeholder={NavTexts.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </nav>
  );
};
