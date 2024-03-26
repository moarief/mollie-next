import { isMonduUp } from "@/app/lib/mondu";
import { Flex, Text, Badge } from "@radix-ui/themes";

export default async function MonduStatus() {
  const monduUp = await isMonduUp();
  return (
    <Flex gap="2" align="baseline" mb="4">
      <Text size="1" color="gray">
        Mondu API
      </Text>
      {monduUp ? (
        <Badge color="green" variant="outline" size="1">
          Up
        </Badge>
      ) : (
        <Badge color="red" variant="outline">
          Down
        </Badge>
      )}
    </Flex>
  );
}
