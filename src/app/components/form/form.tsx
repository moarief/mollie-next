import { revalidatePath } from "next/cache";
import { Button, TextArea, TextFieldInput, Flex } from "@radix-ui/themes";

export default function Form() {
  const addPost = async (formData: FormData) => {
    "use server";

    // hier Mondu Request

    revalidatePath("/orders");
  };

  return (
    <Flex>
      <form action={addPost} className="flex flex-col mb-10 mx-auto space-y-2">
        <TextFieldInput type="text" name="title" placeholder="Title" required />
        <TextArea name="body" placeholder="Body" rows={5} required />

        <Button> Submit </Button>
      </form>
    </Flex>
  );
}
