import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export default function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogTitle></AlertDialogTitle>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col items-center py-10">
            <AlertDialogDescription>
              <Image
                src={"/loader.gif"}
                width={100}
                height={100}
                alt="loader"
              />
              Please wait.. Ai Working in your course
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
// <div className="flex flex-col items-center py-10"><h2>Please wait.. Ai Working in your course</h2>
