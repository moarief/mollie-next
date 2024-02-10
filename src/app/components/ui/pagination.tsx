import { Flex, IconButton } from "@radix-ui/themes";
import { ArrowRightIcon, ArrowLeftIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Pagination({ page }: { page: number }) {
  let nextpage = page + 1;
  let prevpage = page - 1;

  return (
    <Flex direction="row" gap="3" mt="2" mr="2" justify="center">
      <Link href={"/orders/?page=" + prevpage}>
        <IconButton variant="soft">
          <ArrowLeftIcon />
        </IconButton>
      </Link>
      <Link href={"/orders/?page=1"}>
        <IconButton variant="soft">
          <HomeIcon />
        </IconButton>
      </Link>
      <Link href={"/orders/?page=" + nextpage}>
        <IconButton variant="soft">
          <ArrowRightIcon />
        </IconButton>
      </Link>
    </Flex>
  );
}
