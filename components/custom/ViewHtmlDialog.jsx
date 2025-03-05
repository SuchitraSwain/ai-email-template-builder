import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";

const ViewHtmlDialog = ({ openDialog, htmlCode, closeDialog }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(htmlCode);
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle asChild>
              <div className="flex items-center justify-between mt-4">
                <h2 className="text-lg font-semibold">HTML Email Template</h2>
                <Copy
                  className="p-2 bg-gray-100 rounded-full h-9 w-9 cursor-pointer"
                  onClick={copyCode}
                />
              </div>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="max-h-[400px] overflow-auto bg-black text-white rounded-md p-5">
                <pre className="whitespace-pre-wrap break-words overflow-x-auto">
                  <code className="text-sm">{htmlCode}</code>
                </pre>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewHtmlDialog;
