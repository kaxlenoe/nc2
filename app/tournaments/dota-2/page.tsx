import { getCSGOTournaments, getDotaTournaments } from "@/utils/api";
import TournamentsPage from "@/components/TournamentsPage/TournamentsPage";
import {
  getPageStaticStrings,
  getStrapiContentByPosition,
} from "@/utils/strapi";
import SeoText from "@/components/common/SeoText";
import { findObjectByKey } from "@/utils/helpers";
export const dynamic = "force-dynamic";

export const revalidate = 0;
export default async function Tournaments({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const [dotaTournaments, sidebarLandingData, pageStaticStringsApiResponse] =
    await Promise.all([
      getDotaTournaments(),
      getStrapiContentByPosition("sidebar_tournaments_dota"),
      getPageStaticStrings("/tournaments/dota-2"),
    ]);

  const query = searchParams?.search;
  const dataTournamentsFiltered = dotaTournaments?.data.filter(
    (tournament: any) => {
      const tournamentName = tournament.name?.toString().toLowerCase();
      const searchQuery = query?.toString().toLowerCase();

      return (
        tournamentName && searchQuery && tournamentName.includes(searchQuery)
      );
    },
  );

  const tournamentData = dotaTournaments.data.map((tournament: any) => ({
    ...tournament,
    esportCode: "dota2",
  }));

  const tournaments = query ? dataTournamentsFiltered : tournamentData;

  const PAGE_STATIC_STRINGS: IPageStaticString[] =
    pageStaticStringsApiResponse.data?.[0]?.attributes?.strings || null;
  const SEO_TEXT =
    findObjectByKey(PAGE_STATIC_STRINGS, "alias", "SEO_TEXT")?.text?.toString() ||
    undefined;
  const SEO_TEXT_HTML =
    findObjectByKey(PAGE_STATIC_STRINGS, "alias", "SEO_TEXT")?.html?.toString() ||
    undefined;
  const SEO_HEADING =
    findObjectByKey(PAGE_STATIC_STRINGS, "alias", "SEO_HEADING")?.text?.toString() ||
    undefined;

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
