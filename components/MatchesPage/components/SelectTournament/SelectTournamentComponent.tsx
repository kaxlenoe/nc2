import styles from "./SelectTournament.module.scss";
import Chevron from "./components/Chevron";
import {
  SelTrigger,
  Dropdown,
  Wrapper,
  Viewport,
  Item,
} from "./components/select";
import { ITournament } from "@/types/games";

import * as Radix from "@radix-ui/react-select";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removeSpaces } from "@/utils/helpers";

const error = null;

type PropsType = {
  data?: any;
};

const SelectTournamentComponent: FC<PropsType> = ({ data }) => {
  const [toggled, setToggled] = useState("closed");

  const [selectedValue, setSelectedValue] = useState<string>("ALL"); // Setting the initial state

  const [isLoading, setIsLoading] = useState(false);

  const [tournamentList, setTournamentList] = useState<null | ITournament[]>();

  const router = useRouter();

  const handleChange = (value: any) => {
    const selectedOption = tournamentList?.find((item) => item.name === value);

    if (selectedOption) {
      router.replace(`?tournaments=${removeSpaces(selectedOption.id)}`, {
        scroll: false,
      });
    }
  };

  useEffect(() => {
    setTournamentList(data);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 10px 16px 0",
      }}
    >
      <form style={{ width: "100%" }}>
        <Wrapper>
          <Radix.Root
            dir="ltr"
            onOpenChange={(e) => {
              setToggled(e ? "open" : "closed");
            }}
            onValueChange={(value) => {
              if (value === "ALL") {
                setSelectedValue("ALL");
                router.push("/matches");
              } else {
                handleChange(value);
                setSelectedValue(value);
              }
            }}
          >
            <Radix.Trigger
              asChild
              data-state={toggled}
              style={{ border: "unset" }}
            >
              <SelTrigger error={!!error}>
                <span>
                  <span
                    style={{
                      color: "#39555A",
                      fontSize: 14,
                      marginRight: 5,
                    }}
                  >
                    Tournament:
                  </span>
                  <Radix.Value
                    style={{
                      color: "#ACBBC2",
                      fontSize: 14,
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {selectedValue}
                  </Radix.Value>{" "}
                </span>
                <Radix.Icon asChild>
                  {isLoading ? "?" : <Chevron direction="down" />}
                </Radix.Icon>
              </SelTrigger>
            </Radix.Trigger>
            {!isLoading && (
              <Radix.Content asChild style={{ border: "unset" }}>
                <Dropdown style={{}}>
                  <Viewport>
                    <Item className={styles.SelectItem} value={"ALL"}>
                      <Radix.ItemText>ALL</Radix.ItemText>
                    </Item>
                    {tournamentList?.map((item: any, i) => {
                      return (
                        <Item
                          key={i}
                          value={item.name}
                          className={styles.SelectItem}
                        >
                          <Radix.ItemText> {item.name}</Radix.ItemText>
                        </Item>
                      );
                    })}
                  </Viewport>
                </Dropdown>
              </Radix.Content>
            )}
          </Radix.Root>
        </Wrapper>
      </form>
    </div>
  );
};

export default SelectTournamentComponent;
