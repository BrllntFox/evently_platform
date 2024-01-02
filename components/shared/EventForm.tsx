"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "./FileUploader";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import {useUploadThing} from  '@/lib/uploadthing'
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions/event.actions";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
};




const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const initialValues = eventDefaultValues;
  const {startUpload} = useUploadThing('imageUploader');
  const router = useRouter()

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let uploadedImageUrl = values.image_Url;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files)
      if (!uploadedImages) {
        return
      }
      uploadedImageUrl = uploadedImages[0].url
    }
    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: {...values,imageUrl:uploadedImageUrl},
          userId,
        path:'/profile'}
        )
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error) + 'error on create event'
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          {/* ... */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormDescription>
                  This is your public event title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ... */}

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event category</FormLabel>
                <FormControl>
                  <Dropdown value={field.value} onChangeHandler={field.onChange} />
                </FormControl>
                <FormDescription>
                  Let audience search on your events&apos; category.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* ... */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Description</FormLabel>
                <FormControl className="h-72 rounded-lg">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea"
                  />
                </FormControl>
                <FormDescription>
                  Write something about your event{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ... */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="image_Url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event background</FormLabel>
                <FormControl className="h-72 rounded-lg">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormDescription>
                  This is your public event background and OG.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* location */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row ">
          <FormField
            control={form.control}
            name="locationAt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      width={24}
                      height={24}
                      alt="Location"
                    />
                    <Input
                      {...field}
                      placeholder="Location"
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* ... */}
        <div className="flex flex-col gap-5 md:flex-row ">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel></FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      width={24}
                      height={24}
                      alt="calendar"
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-500">
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat={"MM/dd/yyyy h:mm aa"}
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ... */}
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel></FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      width={24}
                      height={24}
                      alt="calendar"
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-500">
                      End Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat={"MM/dd/yyyy h:mm aa"}
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* ... */}
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel></FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      width={24}
                      height={24}
                      alt="dollar"
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-500">
                      Price:
                    </p>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Price"
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0  focus-visible:ring-offset-0"
                    />
                    {/* Isfree */}
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <div className="flex items-center ">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket:
                              </label>
                              <Checkbox
                              onCheckedChange={field.onChange}
                              checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500 "
                              />
                            </div>
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel></FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/link.svg"
                      width={24}
                      height={24}
                      alt="url"
                    />
                    <Input
                      placeholder="Url"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size={'lg'} disabled={form.formState.isSubmitting}>Submit</Button>
      </form>
    </Form>
  );
};

export default EventForm;
