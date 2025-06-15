import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, Clock, Users, Search, Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mentorshipService } from "@/services/dataService";
import { Skeleton } from "../ui/skeleton";

const MentorshipHub = () => {
  const [selectedField, setSelectedField] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [showMentors, setShowMentors] = useState(false);
  const [showBecomeMentor, setShowBecomeMentor] = useState(false);

  const { data: mentorsData, isLoading, error } = useQuery({
    queryKey: ['mentors'],
    queryFn: mentorshipService.getMentors
  });

  const mentors = (mentorsData?.data || []).map(mentor => ({
    id: mentor.user_id,
    name: mentor.profiles?.full_name || 'No name',
    title: mentor.profiles?.title || mentor.profiles?.profession,
    company: mentor.profiles?.organization,
    rating: mentor.rating,
    sessions: mentor.reviews_count || 0,
    specialties: mentor.mentor_expertise.map((e: any) => e.skill),
    bio: mentor.bio,
    price: mentor.hourly_rate ? `KSh ${mentor.hourly_rate}/session` : 'Not specified',
    expertise: mentor.profiles?.profession,
    experience: mentor.years_of_experience ? `${mentor.years_of_experience}+ years` : ''
  }));

  const mentees: any[] = [];

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500 text-center">Could not load mentors. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

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
              <option value="">Select your field of interest</option>
              <option value="Structural Design">Structural Design</option>
              <option value="Project Management">Project Management</option>
              <option value="Code Compliance">Code Compliance</option>
              <option value="Sustainable Design">Sustainable Design</option>
              <option value="Urban Planning">Urban Planning</option>
              <option value="BIM">BIM</option>
              <option value="Cost Estimation">Cost Estimation</option>
              <option value="Contract Administration">Contract Administration</option>
              <option value="Risk Management">Risk Management</option>
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
                        {mentor.name?.split(' ').map(n => n[0]).join('')}
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
                        {mentor.name?.split(' ').map(n => n[0]).join('')}
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
      {mentees.length > 0 && (
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Mentees Seeking Guidance</h2>
        <div className="space-y-3">
          {mentees.map((mentee) => (
            <Card key={mentee.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-gray-200">
                      {mentee.name.split(' ').map((n: string) => n[0]).join('')}
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
      )}
    </div>
  );
};

export default MentorshipHub;
