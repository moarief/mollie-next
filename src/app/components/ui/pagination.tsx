"use client";

import { Flex, IconButton } from "@radix-ui/themes";
import { ArrowRightIcon, ArrowLeftIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Pagination({ page }: { page: number }) {
  const pathname = usePathname();
  let nextpage = page + 1;
  let prevpage = page - 1;

  return (
    <Flex direction="row" gap="3" mt="2" mr="2" justify="center">
      <Link href={pathname + "/?page=" + prevpage}>
        <IconButton variant="soft">
          <ArrowLeftIcon />
        </IconButton>
      </Link>
      <Link href={pathname + "/?page=1"}>
        <IconButton variant="soft">
          <HomeIcon />
        </IconButton>
      </Link>
      <Link href={pathname + "/?page=" + nextpage}>
        <IconButton variant="soft">
          <ArrowRightIcon />
        </IconButton>
      </Link>
    </Flex>
  );
}
