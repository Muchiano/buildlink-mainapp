import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, Clock, Users, Search, Plus } from "lucide-react";
import { useState } from "react";

const MentorshipHub = () => {
  const [selectedField, setSelectedField] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [showMentors, setShowMentors] = useState(false);
  const [showBecomeMentor, setShowBecomeMentor] = useState(false);

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
      price: "KSh 3,000/session",
      expertise: "Civil Engineering",
      experience: "15+ years"
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
      price: "KSh 2,500/session",
      expertise: "Architecture",
      experience: "12+ years"
    },
    {
      id: 3,
      name: "QS. Sarah Wanjiku",
      title: "Senior Quantity Surveyor",
      company: "Cost Consultants Ltd",
      rating: 4.7,
      sessions: 65,
      specialties: ["Cost Estimation", "Contract Administration", "Risk Management"],
      bio: "Expert in construction economics with focus on residential and commercial projects.",
      price: "KSh 2,800/session",
      expertise: "Quantity Surveying",
      experience: "10+ years"
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

  const handleFindMentors = () => {
    setShowMentors(true);
    setShowBecomeMentor(false);
  };

  const handleBecomeMentor = () => {
    setShowBecomeMentor(true);
    setShowMentors(false);
  };

  const filteredMentors = mentors.filter(mentor => {
    const fieldMatch = !selectedField || mentor.specialties.some(specialty => 
      specialty.toLowerCase().includes(selectedField.toLowerCase())
    );
    return fieldMatch;
  });

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
            <select 
              className="w-full p-3 border rounded-lg"
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
            >
              <option value="">Select your field</option>
              <option value="Architecture">Architecture</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Structural Engineering">Structural Engineering</option>
              <option value="Quantity Surveying">Quantity Surveying</option>
              <option value="Project Management">Project Management</option>
            </select>
            <select 
              className="w-full p-3 border rounded-lg"
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              <option value="">Experience level</option>
              <option value="Student">Student</option>
              <option value="Fresh Graduate">Fresh Graduate</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
            </select>
            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-primary hover:bg-primary-800"
                onClick={handleFindMentors}
              >
                <Search className="h-4 w-4 mr-2" />
                Find Mentors
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-primary text-primary hover:bg-primary/10"
                onClick={handleBecomeMentor}
              >
                <Plus className="h-4 w-4 mr-2" />
                Become a Mentor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Become a Mentor Profile */}
      {showBecomeMentor && (
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
      )}

      {/* Mentor Results */}
      {showMentors && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Recommended Mentors {selectedField && `for ${selectedField}`}
          </h2>
          <div className="space-y-4">
            {filteredMentors.map((mentor) => (
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
      )}

      {/* Default Featured Mentors */}
      {!showMentors && !showBecomeMentor && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Featured Mentors</h2>
          <div className="space-y-4">
            {mentors.slice(0, 2).map((mentor) => (
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
      )}

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
