import cloudbetIcon from "@/public/icons/bets-new/cloudbet-logo-s.svg";
import thunderpickLogo from "@/public/icons/bets-new/thunderpick-logo-s.svg";
import melbetLogo from "@/public/icons/bets-new/melbet-logo-s.svg";
import nitrobettingLogo from "@/public/icons/bets-new/nitrobetting-logo-s.svg";
import lootbetLogo from "@/public/icons/bets-new/lootbet-logo-s.svg";
import betsIoLogo from "@/public/icons/bets-new/bets-logo-s.svg";
import x1betLogo from "@/public/icons/bets-new/x1bet-logo-s.svg";
import ggbetLogo from "@/public/icons/bets-new/ggbet-logo-l.svg";
import notFoundIcon from "public/icons/not-found.svg";

// Define the Sportbook interface
export interface ISportbook {
  icon: string;
  link: string;
  readableName: string;
  color?: string; // Optional property
}

// Define the interface for the entire SPORTBOOKS_STATIC object
interface ISportbooksStatic {
  [key: string]: ISportbook;
}

export const SPORTBOOKS_STATIC: ISportbooksStatic = {
  cloudbet: {
    icon: cloudbetIcon,
    link: "https://cldbt.cloud/go/en/bitcoin-bonus?af_token=723f264588e85f662cb14f4cc8be2780",
    color: "#1A1C1E",
    readableName: "CloudBet",
  },
  thunderpick: {
    icon: thunderpickLogo,
    link: "https://thunderpick.io?utm_source=cellxpert&utm_medium=cellxpert&utm_campaign=dd1e02a3-6256-4e8d-9752-5c405a88fce9&cxd=35614_413142",
    color: "#222A33",
    readableName: "ThunderPick",
  },
  melbet: {
    icon: melbetLogo,
    link: "https://refpakrtsb.top/L?tag=d_2813075m_45415c_&site=2813075&ad=45415&r=bonus/rules/1st",
    color: "#212121",
    readableName: "Melbet",
  },
  nitrobetting: {
    icon: nitrobettingLogo,
    link: "https://nitrobetting.eu?ref=7efde0a52bd7",
    color: "#070b28",
    readableName: "NitroBetting",
  },
  lootbet: {
    icon: lootbetLogo,
    link: "https://loot.bet/promo/?aff_token=J_i2wR5X9rXpW3FuxHqQjmNd7ZgqdRLk#bets",
    color: "#212121",
    readableName: "Loot.bet",
  },
  bets: {
    icon: betsIoLogo,
    link: "https://gobets.io/?serial=18563&creative_id=1476&anid=",
    color: "#000616",
    readableName: "Bets.io",
  },
  x1bet: {
    icon: x1betLogo,
    link: "https://1xbet.com",
    color: "#1A5684",
    readableName: "1xBet",
  },
  ggbet: {
    icon: ggbetLogo,
    link: "https://ggbet.io",
    color: "#14171D",
    readableName: "ggbet",
  },
};
export const SPORTBOOKS_READABLES = {
  cloudbet: "CloudBet",
  thunderpick: "ThunderPick",
  melbet: "Melbet",
  nitrobetting: "NitroBetting",
  lootbet: "LootBet",
  bets: "Bets.io",
  x1bet: "1xBet",
  ggbet: "ggbet",
};
