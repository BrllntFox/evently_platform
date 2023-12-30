import * as z from 'zod'

export const eventFormSchema = z.object({
title: z.string().min(3).max(255),
description: z.string().min(3).max(1000),
locationAt:z.string().min(3).max(200),
image_Url:z.string(),
startDateTime:z.date(),
endDateTime:z.date(),
categoryId:z.string(),
price:z.string(),
isFree:z.boolean(),
url:z.string().url(),

})