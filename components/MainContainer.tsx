import React from "react";
import EncryptDecryptPanel from "@/components/EncryptDecryptPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlgorithmDetails from "@/components/AlgorithmDetails";
import { IAlgorithmId } from "@/constants";
import { motion } from "framer-motion";
import { slideInFromBottom } from "@/lib/animationVariants";

function MainContainer({ algorithmId }: { algorithmId: IAlgorithmId }) {
  return (
    <main className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideInFromBottom}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full"
        >
          {/* Form */}
          <Tabs defaultValue="encrypt" className="flex flex-col">
            <TabsList className="w-full grid grid-cols-2 bg-gray-200">
              <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
              <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
            </TabsList>
            <TabsContent value="encrypt" className="h-full">
              <EncryptDecryptPanel mode="encrypt" algorithmId={algorithmId} />
            </TabsContent>
            <TabsContent value="decrypt" className="h-full">
              <EncryptDecryptPanel mode="decrypt" algorithmId={algorithmId} />
            </TabsContent>
          </Tabs>

          {/* Details */}

          <AlgorithmDetails algorithmId={algorithmId} />
        </motion.div>
      </div>
    </main>
  );
}

export default MainContainer;
