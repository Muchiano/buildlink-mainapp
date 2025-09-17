
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BecomeMentorForm = () => {
  return (
    <Card className="border-0 shadow-sm border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Setup Your Mentor Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise</label>
            <div className="flex flex-wrap gap-2">
              {["Structural Design", "Architecture", "Project Management", "BIM", "Sustainable Design", "Cost Estimation"].map((skill) => (
                <Badge key={skill} variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
            <select className="w-full p-3 border rounded-lg">
              <option>5-10 years</option>
              <option>10-15 years</option>
              <option>15+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (KSh)</label>
            <input type="number" placeholder="2500" className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brief Bio</label>
            <textarea
              placeholder="Describe your experience and what you can offer to mentees..."
              className="w-full p-3 border rounded-lg h-24"
            ></textarea>
          </div>
          <Button className="w-full bg-primary hover:bg-primary-800">
            Submit Mentor Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BecomeMentorForm;
