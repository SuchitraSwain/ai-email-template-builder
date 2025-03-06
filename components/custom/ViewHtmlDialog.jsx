import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";

const ViewHtmlDialog = ({ openDialog, htmlCode, closeDialog }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(htmlCode);
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent className="max-w-3xl p-6 rounded-lg shadow-xl bg-white">
          <DialogHeader>
            <DialogTitle asChild>
              <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  HTML Email Template
                </h2>
                <Copy
                  className="p-2 bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-full h-9 w-9 cursor-pointer"
                  onClick={copyCode}
                  title="Copy to Clipboard"
                />
              </div>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="max-h-[500px] overflow-auto bg-gray-800 text-gray-200 rounded-lg p-4 border border-gray-600">
                <pre className="whitespace-pre-wrap break-all text-sm font-mono leading-relaxed overflow-x-auto">
                  <code>{htmlCode}</code>
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
