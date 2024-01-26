"use client";
import cls from "classnames";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./Search.module.scss";
import { useDebounce } from "use-debounce";
import crossIcon from "@/public/icons/search/cross.svg";
import Image from "next/image";

const Search = ({
  search,
  placeholder,
  activeFilter,
}: {
  search?: string;
  placeholder?: string;
  activeFilter?: string;
}) => {
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 200);

  const searchParams = useSearchParams();

  useEffect(() => {
    const searchValue = searchParams.get("search") || "";
    setText(searchValue);
  }, [searchParams]);

  const pathname = usePathname();
  const { replace, push } = useRouter();
  const params = new URLSearchParams(searchParams);

  function handleSearch(term: string) {
    if (term) {
      params.set("search", term);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(text);
  };

  useEffect(() => {
    if (debouncedText) {
      handleSearch(debouncedText);
    }
  }, [debouncedText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(text);
    }
  };

  const handleDelete = () => {
    setText("");
    if (pathname.includes("/tournaments")) {
      push(`${pathname}`);
    } else {
      push(
        `${pathname}?filter=${encodeURI(
          activeFilter?.toLowerCase() as string,
        )}`,
      );
    }
  };

  return (
    <div className={styles.left_layout}>
      <form
        onSubmit={handleSubmit}
        className={cls(styles.search_wrapper, [styles.full_width])}
      >
        <input
          value={text}
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {text && (
          <button className={styles.clearButton} onClick={handleDelete}>
            <Image src={crossIcon.src} width={20} height={20} alt="close" />
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
