
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Webinar {
    id: string;
    title: string;
    provider: string;
}

interface WebinarItemProps {
    webinar: Webinar;
}

const WebinarItem = ({ webinar }: WebinarItemProps) => {
  return (
    <Card key={webinar.id} className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 mb-1">{webinar.title}</h3>
            <p className="text-sm text-gray-600">{webinar.provider}</p>
          </div>
          <Button size="sm" variant="outline">
            Register Free
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebinarItem;
