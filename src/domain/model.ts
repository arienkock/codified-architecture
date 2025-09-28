import * as z from "zod";
 
const User = z.object({
  name: z.string(),
});

type User = z.infer<typeof User>;

