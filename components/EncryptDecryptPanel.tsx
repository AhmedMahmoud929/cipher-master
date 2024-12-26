import { Copy, Lock, RefreshCw, Unlock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { algorithmsDetails, IAlgorithmId } from "@/constants";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { schemas } from "@/lib/schemas";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { oneTimePadAlgorithm } from "@/lib/algorithms/one-time-pad";
import { algorithms } from "@/lib/algorithms";
import { toast } from "sonner";

export default function EncryptDecryptPanel({
  mode,
  algorithmId,
}: {
  mode: "encrypt" | "decrypt";
  algorithmId: IAlgorithmId;
}) {
  const [output, setOutput] = useState("");
  const algorithm = algorithms[algorithmId];
  const formSchema = schemas[algorithmId];
  type FormFields = z.infer<typeof formSchema>;
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
      key: "",
    },
  });

  const onSubmit = ({ input, key }: FormFields) => {
    const usedAlgorithm =
      mode === "encrypt" ? algorithm.encrypt : algorithm.decrypt;
    const result = usedAlgorithm(input, key);
    setOutput(result);
  };

  const resetValues = () => {
    form.reset();
    setOutput("");
    toast.success("History cleared successfully");
  };

  const copyToClipboard = async (): Promise<void> => {
    if (navigator.clipboard) {
      try {
        if (output) {
          await navigator.clipboard.writeText(output);
          toast.success("Copied to clipboard!");
        }
      } catch (error) {
        toast.error("Failed to copy");
      }
    } else {
      toast.error("Clipboard API not supported in this browser.");
    }
  };

  return (
    <Card className="h-full grid grid-rows-[60%_40%] py-4 px-6 rounded-lg shadow-none space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-lg font-medium mb-2 block">
                    Input
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Enter message to ${mode}...`}
                      className="h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg font-medium mb-2 block">
                    Key
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col">
            <Button className="mt-4 ml-auto" type="submit">
              {mode === "encrypt" ? (
                <Lock className="mr-2 h-4 w-4" />
              ) : (
                <Unlock className="mr-2 h-4 w-4" />
              )}
              {mode === "encrypt" ? "Encrypt" : "Decrypt"}
            </Button>
          </div>
        </form>
      </Form>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col h-[95%]">
          <Label
            htmlFor={`${mode}-output`}
            className="text-lg font-medium mb-2 block"
          >
            Output
          </Label>
          <Textarea
            id={`${mode}-output`}
            value={output}
            placeholder={`${
              mode === "encrypt" ? "Encrypted" : "Decrypted"
            } message will appear here...`}
            className="h-full"
            readOnly
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={resetValues}>
            <RefreshCw className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </div>
    </Card>
  );
}
