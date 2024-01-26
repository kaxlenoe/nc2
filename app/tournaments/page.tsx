import {
  getCSGOTournaments,
  getDotaTournaments,
  getLoLTournaments,
} from "@/utils/api";

import TournamentsPage from "@/components/TournamentsPage/TournamentsPage";
import {
  getPageStaticStrings,
  getStrapiContentByPosition,
} from "@/utils/strapi";
import SeoText from "@/components/common/SeoText";
import { findObjectByKey } from "@/utils/helpers";

export const revalidate = 0;
export default async function Tournaments({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const csgoTournaments = await getCSGOTournaments();
  const dotaTournaments = await getDotaTournaments();
  const leagueTournaments = await getLoLTournaments();

  const query = searchParams?.search;

  const dataTournaments = [
    ...csgoTournaments.data.map((tournament: any) => ({
      ...tournament,
      esportCode: "csgo",
    })),
    ...dotaTournaments.data.map((tournament: any) => ({
      ...tournament,
      esportCode: "dota2",
    })),
    ...leagueTournaments.data.map((tournament: any) => ({
      ...tournament,
      esportCode: "lol",
    })),
  ];

  const dataTournamentsFiltered = dataTournaments.filter((tournament: any) => {
    const tournamentName = tournament.name?.toString().toLowerCase();
    const searchQuery = query?.toString().toLowerCase();

    return (
      tournamentName && searchQuery && tournamentName.includes(searchQuery)
    );
  });

  const tournaments = query ? dataTournamentsFiltered : dataTournaments;

  const sidebarLandingData: any = await getStrapiContentByPosition(
    "sidebar_tournaments",
  );

  const pageStaticStringsApiResponse =
    await getPageStaticStrings("/tournaments");
  const PAGE_STATIC_STRINGS: IPageStaticString[] =
    pageStaticStringsApiResponse.data?.[0]?.attributes?.strings || null;
  const SEO_TEXT =
    findObjectByKey(
      PAGE_STATIC_STRINGS,
      "alias",
      "SEO_TEXT",
    )?.text?.toString() || undefined;
  const SEO_TEXT_HTML =
    findObjectByKey(
      PAGE_STATIC_STRINGS,
      "alias",
      "SEO_TEXT",
    )?.html?.toString() || undefined;
  const SEO_HEADING =
    findObjectByKey(
      PAGE_STATIC_STRINGS,
      "alias",
      "SEO_HEADING",
    )?.text?.toString() || undefined;

  return (
    <div>
      <TournamentsPage
        dataTournaments={tournaments}
        sidebarLandingData={sidebarLandingData?.data}
      />
      <SeoText
        SEO_TEXT={SEO_TEXT}
        SEO_TEXT_HTML={SEO_TEXT_HTML}
        SEO_HEADING={SEO_HEADING}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const csgoTournaments = await getCSGOTournaments();
  const dotaTournaments = await getDotaTournaments();
  const leagueTournaments = await getLoLTournaments();

  const games = [
    ...csgoTournaments.data,
    ...dotaTournaments.data,
    ...leagueTournaments.data,
  ];
  return games.map((game: any) => {
    return {
      id: game.id,
    };
  });
}
