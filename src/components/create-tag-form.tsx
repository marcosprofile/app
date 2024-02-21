import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import * as Dialog from "@radix-ui/react-dialog";

const createTagSchema = z.object({
  name: z.string().min(3, { message: "Minimum 3 characters." }),
  slug: z.string(),
});

export function CreateTagForm() {
  const { register, handleSubmit, watch } = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema),
  });

  type CreateTagSchema = z.infer<typeof createTagSchema>;

  function createTag(data: CreateTagSchema) {
    console.log(data);
  }

  const slug = watch('name')

  return (
    <form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="name">
          Tag name
        </label>
        <input
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 text-sm w-full"
          id="name"
          type="text"
          {...register("name")}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">
          Slug
        </label>
        <input
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 text-sm w-full"
          id="slug"
          type="text"
          readOnly
          value={slug}
          {...register("slug")}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button aria-label="Close">
            <X className="size-3" />
            Cancel
          </Button>
        </Dialog.Close>
        <Button className="bg-teal-400 text-teal-950" type="submit">
          <Check className="size-3" />
          Save
        </Button>
      </div>
    </form>
  );
}
