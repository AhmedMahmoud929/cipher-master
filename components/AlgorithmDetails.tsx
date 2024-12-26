import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Algorithm, IAlgorithmId, algorithmsDetails } from "@/constants/index";

export default function AlgorithmDetails({
  algorithmId,
}: {
  algorithmId: IAlgorithmId;
}) {
  const algorithm = algorithmsDetails.find(
    (a) => a.id === algorithmId
  ) as Algorithm;

  if (!algorithm) {
    return <div>Algorithm not found</div>;
  }

  return (
    <ScrollArea className="bg-white rounded-md">
      <div className="px-8 pt-6 pb-12 space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-2">Video Explanation</h3>
          <div className="aspect-video relative mt-2">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${algorithm.videoId}`}
              title={`${algorithm.name} Explanation`}
              className="bg-gray-600 absolute inset-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-lg text-muted-foreground mt-2">
            {algorithm.description}
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">How It Works</h3>
          <ol className="list-decimal list-inside space-y-2">
            {algorithm.howItWorks.map((step, index) => (
              <li key={index} className="text-muted-foreground">
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc list-inside space-y-2">
            {algorithm.keyFeatures.map((feature, index) => (
              <li key={index} className="text-muted-foreground">
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Historical Context</h3>
          <p className="text-muted-foreground">{algorithm.historicalContext}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Complexity Analysis</h3>
          <dl className="space-y-2">
            <div>
              <dt className="font-semibold">Encryption:</dt>
              <dd className="text-muted-foreground">
                {algorithm.complexity.encryption}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Decryption:</dt>
              <dd className="text-muted-foreground">
                {algorithm.complexity.decryption}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Key Space:</dt>
              <dd className="text-muted-foreground">
                {algorithm.complexity.keySpace}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </ScrollArea>
  );
}
