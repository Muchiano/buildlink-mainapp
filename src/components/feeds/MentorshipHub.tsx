
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, DollarSign, MessageSquare } from 'lucide-react';

const MentorshipHub = () => {
  const [activeTab, setActiveTab] = useState('mentors');

  const mentors = [
    {
      id: 1,
      name: "Dr. Grace Wanjiku",
      title: "Senior Software Engineer",
      company: "Safaricom",
      avatar: "/placeholder.svg",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 50,
      expertise: ["Software Development", "Career Growth", "Leadership"],
      experience: "8+ years",
      bio: "Passionate about helping junior developers navigate their careers in tech. Specializing in software architecture and team leadership."
    },
    {
      id: 2,
      name: "Michael Ochieng",
      title: "Product Manager", 
      company: "Twiga Foods",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviews: 89,
      hourlyRate: 40,
      expertise: ["Product Management", "Strategy", "Market Research"],
      experience: "6+ years",
      bio: "Former consultant turned product manager. I help aspiring PMs understand the product lifecycle and strategic thinking."
    },
    {
      id: 3,
      name: "Sarah Muthoni",
      title: "Data Scientist",
      company: "NCBA Bank",
      avatar: "/placeholder.svg",
      rating: 4.7,
      reviews: 64,
      hourlyRate: 45,
      expertise: ["Data Science", "Machine Learning", "Analytics"],
      experience: "5+ years", 
      bio: "Helping students and professionals transition into data science. Experienced in financial modeling and predictive analytics."
    }
  ];

  const sessions = [
    {
      id: 1,
      mentor: "Dr. Grace Wanjiku",
      topic: "Career Transition to Tech",
      date: "Dec 12, 2024",
      time: "2:00 PM",
      status: "upcoming"
    },
    {
      id: 2,
      mentor: "Michael Ochieng",
      topic: "Product Strategy Fundamentals",
      date: "Dec 10, 2024", 
      time: "4:00 PM",
      status: "completed"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-gray-200">
        <Button
          variant={activeTab === 'mentors' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('mentors')}
          className="pb-2"
        >
          Find Mentors
        </Button>
        <Button
          variant={activeTab === 'sessions' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('sessions')}
          className="pb-2"
        >
          My Sessions
        </Button>
      </div>

      {activeTab === 'mentors' && (
        <div className="space-y-4">
          {mentors.map(mentor => (
            <Card key={mentor.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.title} at {mentor.company}</p>
                        <p className="text-sm text-gray-500 mt-1">{mentor.experience} experience</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{mentor.rating}</span>
                          <span className="text-gray-500">({mentor.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">${mentor.hourlyRate}/hr</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mt-3">{mentor.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {mentor.expertise.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3 mt-4">
                      <Button className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Request Session
                      </Button>
                      <Button variant="outline">View Profile</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-4">
          {sessions.map(session => (
            <Card key={session.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{session.topic}</h3>
                    <p className="text-gray-600">with {session.mentor}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.date} at {session.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={session.status === 'upcoming' ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                    <div className="mt-2">
                      {session.status === 'upcoming' ? (
                        <Button size="sm">Join Session</Button>
                      ) : (
                        <Button variant="outline" size="sm">Leave Review</Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorshipHub;
