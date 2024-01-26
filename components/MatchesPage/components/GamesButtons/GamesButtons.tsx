"use client";

import styles from "./GamesButtons.module.scss";
import Link from "next/link";
import Image from "next/image";
import csgoIcon from "public/icons/cs-go.svg";
import dotaIcon from "public/icons/dota.svg";
import lolIcon from "public/icons/legends.svg";
import React from "react";
import { usePathname } from "next/navigation";
import chevronRightIcon from "public/icons/chevron-right.svg";
import { revalidatePath } from "next/cache";
import { determineHrefForGamesButtons, isRootPage } from "@/utils/helpers";

interface GamesButtonsProps {
  fromMatchesPage?: boolean;
  fromTournamentsPage?: boolean;
  fromPicksPage?: boolean;
}

// Enum-like structure for games
const GAMES = [
  { name: "Counter-Strike", slug: "counter-strike", icon: csgoIcon },
  { name: "Dota 2", slug: "dota-2", icon: dotaIcon },
  { name: "League of Legends", slug: "league-of-legends", icon: lolIcon },
];

const GamesButtons: React.FC<GamesButtonsProps> = ({
  fromMatchesPage,
  fromTournamentsPage,
  fromPicksPage,
}) => {
  const pathname = usePathname();
  const isRootLanding = pathname === "/";
  const isRootTournamentsPage = isRootPage(pathname, "tournaments");
  const isRootMatchesPage = isRootPage(pathname, "matches");
  const isRootPicksPage = isRootPage(pathname, "picks");

  return (
    <div className={styles.gamesButtonsWidget}>
      <div className={styles.gamesButtonsWrapper}>
        {GAMES.map((game, index) => (
          <Link
            key={index}
            className={`${styles.gameLogoLink}`}
            href={determineHrefForGamesButtons(pathname, game.slug)}
            onClick={() =>
              revalidatePath(determineHrefForGamesButtons(pathname, game.slug))
            }
          >
            <span
              className={`${styles.gameLogo} ${
                pathname.includes(game.slug) && styles.gameLogoCurrent
              }`}
            >
              <Image
                src={game.icon}
                width={24}
                height={24}
                alt={`${game.name} icon`}
              />
            </span>
          </Link>
        ))}
        {!isRootMatchesPage && !isRootTournamentsPage && !isRootPicksPage ? (
          <>
            {!fromTournamentsPage && !fromPicksPage && (
              <Link
                href={"/matches"}
                className={styles.allGamesBtn}
                onClick={() => revalidatePath("/matches")}
              >
                All matches{" "}
                <Image
                  src={chevronRightIcon.src}
                  alt={""}
                  width={10}
                  height={10}
                />
              </Link>
            )}
            {fromTournamentsPage && (
              <Link
                href={"/tournaments"}
                className={styles.allGamesBtn}
                onClick={() => revalidatePath("/tournaments")}
              >
                All tournaments{" "}
                <Image
                  src={chevronRightIcon.src}
                  alt={""}
                  width={10}
                  height={10}
                />
              </Link>
            )}
            {fromPicksPage && (
              <Link
                href={"/picks"}
                className={styles.allGamesBtn}
                onClick={() => revalidatePath("/picks")}
              >
                All picks{" "}
                <Image
                  src={chevronRightIcon.src}
                  alt={""}
                  width={10}
                  height={10}
                />
              </Link>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default GamesButtons;
