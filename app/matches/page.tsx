import {
  getCSGOData,
  getCSGOTournaments,
  getDotaData,
  getDotaTournaments,
  getLeagueData,
  getLoLTournaments,
} from "@/utils/api";
import { MatchesPage } from "@/components/MatchesPage";
import { matchStatuses } from "@/constants";
import {
  getPageStaticStrings,
  getStrapiContentByPosition,
} from "@/utils/strapi";
import SeoText from "@/components/common/SeoText";
import { findObjectByKey } from "@/utils/helpers";

export const revalidate = 0;
export const dynamic = 'force-dynamic';
const Matches = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { search: string; tournaments: string; tournamentId: string };
}) => {
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
    getCSGOData({ order: "ASC", page: 1, take: 20, query }),
    getDotaData({ order: "ASC", page: 1, take: 20, query }),
    getLeagueData({
      order: "ASC",
      page: 1,
      take: 20,
      query,
    }),
    getCSGOTournaments(),
    getDotaTournaments(),
    getLoLTournaments(),
    getCSGOData({ order: "ASC", page: 1, take: 10, status: "UPCOMING" }),
    getDotaData({ order: "ASC", page: 1, take: 10, status: "UPCOMING" }),
    getLeagueData({
      order: "ASC",
      page: 1,
      take: 10,
    }),
  ]);
  const data = [...csgoData.data, ...dotaData.data, ...leagueData.data];

  const highlightsData = [
    ...highlightsCsgo.data
      .filter(
        (item: { odds: any[] }) =>
          item.odds.length !== 0 &&
          item.odds.every((odd) => odd.winner !== null),
      )
      .slice(0, 1),
    ,
    ...highlightsDota.data
      .filter(
        (item: { odds: any[] }) =>
          item.odds.length !== 0 &&
          item.odds.every((odd) => odd.winner !== null),
      )
      .slice(0, 1),
    ...highlightsLeague.data
      .filter(
        (item: { odds: any[] }) =>
          item.odds.length !== 0 &&
          item.odds.every((odd) => odd.winner !== null),
      )
      .slice(0, 1),
  ];
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

  const csgoDataResults = await getCSGOData({
    status: matchStatuses.past,
    order: "DESC",
    page: 1,
    take: 20,
    query,
  });
  const dotaResults = await getDotaData({
    status: matchStatuses.past,
    order: "DESC",
    page: 1,
    take: 20,
    query,
  });
  const lolResults = await getLeagueData({
    status: matchStatuses.past,
    order: "DESC",
    page: 1,
    take: 20,
    query,
  });

  const resultsData = [
    ...csgoDataResults.data,
    ...dotaResults.data,
    ...lolResults.data,
  ];

  const filteredAndSortedResults = resultsData.sort(
    (
      a: { beginAt: string | number | Date },
      b: { beginAt: string | number | Date },
      // @ts-ignore
    ) => new Date(b.beginAt) - new Date(a.beginAt),
  );

  const sidebarLandingData: any =
    await getStrapiContentByPosition("sidebar_matches");

  const landingData = await getStrapiContentByPosition("featured_landing");

  const pageStaticStringsApiResponse = await getPageStaticStrings("/matches");
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
    <>
      <MatchesPage
        data={data}
        dataTournaments={dataTournaments}
        resultsData={filteredAndSortedResults}
        sidebarLandingData={sidebarLandingData?.data}
        landingData={landingData?.data}
        highlightsData={highlightsData}
      />
      <SeoText
        SEO_TEXT={SEO_TEXT}
        SEO_TEXT_HTML={SEO_TEXT_HTML}
        SEO_HEADING={SEO_HEADING}
      />
    </>
  );
};

export default Matches;
