// "use client";

// import * as React from "react";
// import * as DialogPrimitive from "@radix-ui/react-dialog@1.1.6";
// import { XIcon } from "lucide-react@0.487.0";

// import { cn } from "./utils";

// function Dialog({
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Root>) {
//   return <DialogPrimitive.Root data-slot="dialog" {...props} />;
// }

// function DialogTrigger({
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
//   return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
// }

// function DialogPortal({
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
//   return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
// }

// function DialogClose({
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Close>) {
//   return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
// }

// function DialogOverlay({
//   className,
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
//   return (
//     <DialogPrimitive.Overlay
//       data-slot="dialog-overlay"
//       className={cn(
//         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function DialogContent({
//   className,
//   children,
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Content>) {
//   return (
//     <DialogPortal data-slot="dialog-portal">
//       <DialogOverlay />
//       <DialogPrimitive.Content
//         data-slot="dialog-content"
//         className={cn(
//           "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
//           className,
//         )}
//         {...props}
//       >
//         {children}
//         <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
//           <XIcon />
//           <span className="sr-only">Close</span>
//         </DialogPrimitive.Close>
//       </DialogPrimitive.Content>
//     </DialogPortal>
//   );
// }

// function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="dialog-header"
//       className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
//       {...props}
//     />
//   );
// }

// function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="dialog-footer"
//       className={cn(
//         "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function DialogTitle({
//   className,
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Title>) {
//   return (
//     <DialogPrimitive.Title
//       data-slot="dialog-title"
//       className={cn("text-lg leading-none font-semibold", className)}
//       {...props}
//     />
//   );
// }

// function DialogDescription({
//   className,
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Description>) {
//   return (
//     <DialogPrimitive.Description
//       data-slot="dialog-description"
//       className={cn("text-muted-foreground text-sm", className)}
//       {...props}
//     />
//   );
// }

// export {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogOverlay,
//   DialogPortal,
//   DialogTitle,
//   DialogTrigger,
// };
//
// 'use client';

// import * as React from 'react';
// import * as DialogPrimitive from '@radix-ui/react-dialog';
// import { XIcon } from 'lucide-react';

// import { cn } from './utils';

// function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
//   return <DialogPrimitive.Root data-slot="dialog" {...props} />;
// }

// function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
//   return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
// }

// function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
//   return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
// }

// function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
//   return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
// }

// const DialogOverlay = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
// >(({ className, ...props }, ref) => {
//   return (
//     <DialogPrimitive.Overlay
//       ref={ref}
//       data-slot="dialog-overlay"
//       className={cn(
//         'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
//         className
//       )}
//       {...props}
//     />
//   );
// });
// DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// function DialogContent({
//   className,
//   children,
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Content>) {
//   return (
//     <DialogPortal data-slot="dialog-portal">
//       <DialogOverlay />
//       <DialogPrimitive.Content
//         data-slot="dialog-content"
//         className={cn(
//           'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
//           className
//         )}
//         {...props}
//       >
//         {children}
//         <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
//           <XIcon />
//           <span className="sr-only">Close</span>
//         </DialogPrimitive.Close>
//       </DialogPrimitive.Content>
//     </DialogPortal>
//   );
// }

// function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot="dialog-header"
//       className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
//       {...props}
//     />
//   );
// }

// function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot="dialog-footer"
//       className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
//       {...props}
//     />
//   );
// }

// function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
//   return (
//     <DialogPrimitive.Title
//       data-slot="dialog-title"
//       className={cn('text-lg leading-none font-semibold', className)}
//       {...props}
//     />
//   );
// }

// function DialogDescription({
//   className,
//   ...props
// }: React.ComponentProps<typeof DialogPrimitive.Description>) {
//   return (
//     <DialogPrimitive.Description
//       data-slot="dialog-description"
//       className={cn('text-muted-foreground text-sm', className)}
//       {...props}
//     />
//   );
// }

// export {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogOverlay,
//   DialogPortal,
//   DialogTitle,
//   DialogTrigger,
// };

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

export const DialogTrigger = (props: any) => (
  <Dialog.Trigger asChild>
    {/* <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
        Edit profile
      </button> */}
    {props.children}
  </Dialog.Trigger>
);

const DialogDemo = () => (
  <Dialog.Root>
    <DialogTrigger />
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:animate-overlayShow z-50 bg-[#161821]" />
      <Dialog.Content className="bg-[#1f2635] text-white fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow z-51">
        <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
          Edit profile
        </Dialog.Title>
        <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="w-[90px] text-right text-[15px] text-violet11" htmlFor="name">
            Name
          </label>
          <input
            className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
            id="name"
            defaultValue="Pedro Duarte"
          />
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="w-[90px] text-right text-[15px] text-violet11" htmlFor="username">
            Username
          </label>
          <input
            className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
            id="username"
            defaultValue="@peduarte"
          />
        </fieldset>
        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 outline-none outline-offset-1 hover:bg-green5 focus-visible:outline-2 focus-visible:outline-green6 select-none">
              Save changes
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
