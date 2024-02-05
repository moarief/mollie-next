import { Badge } from "@radix-ui/themes";

export default async function StateBadge(props: { state: string }) {
  let state: string = props.state;
  let result: JSX.Element = <Badge color="gray">{state}</Badge>;

  switch (state) {
    case "pending":
      result = <Badge color="amber">{state}</Badge>;
      break;
    case "shipped":
      result = <Badge color="green">{state}</Badge>;
      break;
    case "complete":
      result = <Badge color="green">{state}</Badge>;
      break;
    case "partially_shipped":
      result = <Badge color="teal">{state}</Badge>;
      break;
    case "canceled":
      result = <Badge color="red">{state}</Badge>;
      break;
    case "data_required":
      result = <Badge color="amber">{state}</Badge>;
      break;
    case "authorized":
      result = <Badge color="teal">{state}</Badge>;
      break;
    case "confirmed":
      result = <Badge color="teal">{state}</Badge>;
      break;
    case "declined":
      result = <Badge color="red">{state}</Badge>;
      break;
    default:
      result = <Badge color="gray">{state}</Badge>;
      break;
  }

  return result;
}
