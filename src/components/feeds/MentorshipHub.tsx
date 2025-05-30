
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, Clock, Users } from "lucide-react";

const MentorshipHub = () => {
  const mentors = [
    {
      id: 1,
      name: "Eng. Mary Njoki",
      title: "Senior Structural Engineer",
      company: "Kenya Railways",
      rating: 4.9,
      sessions: 127,
      specialties: ["Structural Design", "Project Management", "Code Compliance"],
      bio: "15+ years in infrastructure development. Passionate about mentoring young engineers.",
      price: "KSh 3,000/session"
    },
    {
      id: 2,
      name: "Arch. Peter Mwangi",
      title: "Principal Architect",
      company: "Mwangi & Associates",
      rating: 4.8,
      sessions: 89,
      specialties: ["Sustainable Design", "Urban Planning", "BIM"],
      bio: "Award-winning architect specializing in eco-friendly commercial buildings.",
      price: "KSh 2,500/session"
    }
  ];

  const mentees = [
    {
      id: 1,
      name: "Grace Akinyi",
      field: "Architecture Student",
      university: "University of Nairobi",
      seeking: "Portfolio Review & Career Guidance",
      year: "Final Year"
    },
    {
      id: 2,
      name: "David Kimani",
      field: "Junior Engineer",
      company: "Fresh Graduate",
      seeking: "Industry Transition Support",
      year: "New Graduate"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Mentorship Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">150+</div>
            <div className="text-xs text-gray-600">Active Mentors</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">1.2K</div>
            <div className="text-xs text-gray-600">Mentees Matched</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">95%</div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Match */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary">Find Your Perfect Mentor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <select className="w-full p-3 border rounded-lg">
              <option>Select your field</option>
              <option>Architecture</option>
              <option>Civil Engineering</option>
              <option>Structural Engineering</option>
              <option>Quantity Surveying</option>
              <option>Project Management</option>
            </select>
            <select className="w-full p-3 border rounded-lg">
              <option>Experience level</option>
              <option>Student</option>
              <option>Fresh Graduate</option>
              <option>1-3 years</option>
              <option>3-5 years</option>
            </select>
            <Button className="w-full bg-primary hover:bg-primary-800">
              Find Mentors
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Mentors */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Featured Mentors</h2>
        <div className="space-y-4">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary text-white">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.title}</p>
                    <p className="text-xs text-gray-500 mb-2">{mentor.company}</p>
                    
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{mentor.sessions} sessions</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{mentor.bio}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">{mentor.price}</span>
                      <Button size="sm" className="bg-primary hover:bg-primary-800">
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mentees Looking for Mentors */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Mentees Seeking Guidance</h2>
        <div className="space-y-3">
          {mentees.map((mentee) => (
            <Card key={mentee.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-gray-200">
                      {mentee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{mentee.name}</h3>
                    <p className="text-sm text-gray-600">{mentee.field} • {mentee.year}</p>
                    <p className="text-sm text-gray-500">{mentee.seeking}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Offer Mentorship
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipHub;
