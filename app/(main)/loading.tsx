import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex items-center justify-center p-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
