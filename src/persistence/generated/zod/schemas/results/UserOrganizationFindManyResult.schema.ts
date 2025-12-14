import { z } from 'zod';
export const UserOrganizationFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  isCurrent: z.boolean(),
  isAdmin: z.boolean(),
  user: z.unknown(),
  organization: z.unknown()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});