import {
  getCSGOData,
  getCSGOPicks,
  getCSGOTournaments,
  getDotaData,
  getDotaPicks,
  getDotaTournaments,
  getLeagueData,
  getLOLPicks,
  getLoLTournaments,
} from "@/utils/api";
import { MatchesPage } from "@/components/MatchesPage";
import { notFound } from "next/navigation";
import {
  getPageStaticStrings,
  getStrapiContentByPosition,
} from "@/utils/strapi";
import SeoText from "@/components/common/SeoText";
import { findObjectByKey } from "@/utils/helpers";

export const revalidate = 0;
export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const query = searchParams?.search;
  const [
    csgoData,
    dotaData,
    leagueData,
    csgoTournaments,
    dotaTournaments,
    leagueTournaments,
    highlightsCsgo,
    highlightsDota,
    highlightsLeague,
  ] = await Promise.all([
    getCSGOData({ order: "ASC", page: 1, take: 20, query, status: "UPCOMING" }),
    getDotaData({ order: "ASC", page: 1, take: 20, query, status: "UPCOMING" }),
    getLeagueData({
      order: "ASC",
      page: 1,
      take: 20,
      query,
      status: "UPCOMING",
    }),
    getCSGOTournaments(),
    getDotaTournaments(),
    getLoLTournaments(),
    getCSGOData({ order: "ASC", page: 1, take: 1, status: "UPCOMING" }),
    getDotaData({ order: "ASC", page: 1, take: 1, status: "UPCOMING" }),
    getLeagueData({
      order: "ASC",
      page: 1,
      take: 1,
      status: "UPCOMING",
    }),
  ]);

  const highlightsData = [
    ...highlightsCsgo?.data,
    ...highlightsDota?.data,
    ...highlightsLeague?.data,
  ];

  const data = [
    ...csgoData.data
      .filter(
        (item: { odds: any[] }) =>
          item.odds.length !== 0 &&
          item.odds.every((odd) => odd.winner !== null),
      )
      .slice(0, 2),

    ...dotaData.data
      .filter(
        (item: { odds: any[] }) =>
          item.odds.length !== 0 &&
          item.odds.every((odd) => odd.winner !== null),
      )
      .slice(0, 2),

    ...leagueData.data
      .filter(
        (item: { odds: any[] }) =>
          item.odds.length !== 0 &&
          item.odds.every((odd) => odd.winner !== null),
      )
      .slice(0, 2),
  ];

  const dataWithPredictionsOnly = data.filter(
    (item) => item.probTeamA !== null && item.probTeamB !== null,
  );

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

  const { data: csPicks } = await getCSGOPicks();
  const { data: dotaPicks } = await getDotaPicks();
  const { data: leaguePicks } = await getLOLPicks();

  const picksData = [...csPicks, ...dotaPicks, ...leaguePicks].slice(0, 4);

  const sidebarLandingData: any =
    await getStrapiContentByPosition("sidebar_landing");

  const landingData = await getStrapiContentByPosition("featured_landing");

  if (!data) {
    return notFound();
  }

  const pageStaticStringsApiResponse = await getPageStaticStrings("/");
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
      <MatchesPage
        data={dataWithPredictionsOnly}
        dataTournaments={dataTournaments}
        sidebarLandingData={sidebarLandingData?.data}
        landingData={landingData?.data}
        highlightsData={highlightsData}
        picksData={picksData}
      />
      <SeoText
        SEO_TEXT={SEO_TEXT}
        SEO_TEXT_HTML={SEO_TEXT_HTML}
        SEO_HEADING={SEO_HEADING}
      />
    </div>
  );
}
