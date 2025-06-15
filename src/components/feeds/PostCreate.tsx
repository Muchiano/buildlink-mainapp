
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Camera, FileText, Briefcase, Users, MapPin, X } from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { postsService } from '@/services/postsService';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Add support for uploading a single image per post for MVP

const PostCreate = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [postType, setPostType] = useState("update");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const postTypes = [
    { id: "update", label: "Share Update", icon: FileText, description: "Share project milestones, insights, or industry thoughts" },
    { id: "job", label: "Post Job", icon: Briefcase, description: "Advertise job openings, gigs, or project opportunities" },
    { id: "project", label: "Showcase Project", icon: Camera, description: "Display your latest work and achievements" },
    { id: "collaboration", label: "Seek Collaboration", icon: Users, description: "Find partners for projects or business ventures" }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!user || !content.trim()) {
      toast({
        title: "Error",
        description: "Please write something before posting",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      let image_url: string | undefined;
      if (imageFile) {
        // upload image to Supabase Storage
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `user-${user.id}/${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('post-media')
          .upload(filePath, imageFile, { upsert: false });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast({
            title: "Upload Failed",
            description: "Could not upload image. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // <-- FIX: get public URL the right way
        const { data: publicUrlData, error: publicUrlError } = supabase
          .storage
          .from('post-media')
          .getPublicUrl(filePath);
        if (publicUrlError) {
          console.error('GetPublicUrl error:', publicUrlError);
          toast({
            title: "Image URL Error",
            description: "Could not get image URL. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        image_url = publicUrlData?.publicUrl;
        // End FIX
      }

      const { error } = await postsService.createPost({
        content,
        category: postType,
        user_id: user.id,
        image_url,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Your post has been created successfully!"
      });

      setContent("");
      setPostType("update");
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Please sign in to create posts</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Post Type Selection */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary">What would you like to share?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {postTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setPostType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    postType === type.id 
                      ? "border-primary bg-primary-50" 
                      : "border-gray-200 hover:border-primary-300"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-6 w-6 mt-1 ${
                      postType === type.id ? "text-primary" : "text-gray-600"
                    }`} />
                    <div>
                      <h3 className={`font-medium ${
                        postType === type.id ? "text-primary" : "text-gray-800"
                      }`}>
                        {type.label}
                      </h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Content Creation */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex space-x-3 mb-4">
            <Avatar>
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-primary text-white">
                {user?.user_metadata?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">
                {user?.user_metadata?.full_name || 'Your Name'}
              </h3>
              <p className="text-sm text-gray-600">Professional</p>
            </div>
          </div>
          
          <Textarea
            placeholder={
              postType === "job" 
                ? "Describe the job opportunity, requirements, and how to apply..."
                : postType === "project"
                ? "Tell us about your project - what you built, challenges faced, and key learnings..."
                : postType === "collaboration"
                ? "Describe what kind of collaboration you're seeking and what you bring to the table..."
                : "Share your thoughts, insights, or updates with the community..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none border-0 text-base p-0"
          />
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative my-4 w-full max-w-xs">
              <img src={imagePreview} className="w-full h-40 rounded-md object-cover border" alt="Preview" />
              <button
                type="button"
                aria-label="Remove image"
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                onClick={handleRemoveImage}
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          )}

          {/* Media Upload Options */}
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600"
              asChild
              onClick={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
            >
              <span>
                <Camera className="h-4 w-4 mr-2" />
                Add Photos
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600" disabled>
              <FileText className="h-4 w-4 mr-2" />
              Add Document (soon)
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600" disabled>
              <MapPin className="h-4 w-4 mr-2" />
              Add Location (soon)
            </Button>
          </div>

          <div className="flex justify-end mt-4">
            <Button 
              className="bg-primary hover:bg-primary-800"
              disabled={!content.trim() || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? 'Posting...' : 
               postType === "job" ? "Post Job" : 
               postType === "project" ? "Share Project" :
               postType === "collaboration" ? "Seek Collaboration" : "Share Update"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Templates */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Quick Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left p-3 h-auto"
              onClick={() => setContent("🎉 Excited to announce that our team just completed [Project Name]! The project involved [brief description]. Key learnings include [insights]. #ProjectComplete #BuildingKenya")}
            >
              <div>
                <div className="font-medium">Project Completion</div>
                <div className="text-sm text-gray-600">Announce a finished project</div>
              </div>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left p-3 h-auto"
              onClick={() => setContent("💡 Industry Insight: After working on [project type] for [duration], I've learned that [key insight]. This could help fellow professionals because [explanation]. What's your experience? #IndustryInsights")}
            >
              <div>
                <div className="font-medium">Industry Insight</div>
                <div className="text-sm text-gray-600">Share professional knowledge</div>
              </div>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left p-3 h-auto"
              onClick={() => setContent("📢 We're hiring! Looking for a [position] to join our team at [company]. Requirements: [key requirements]. Interested candidates can [how to apply]. #JobOpening #Hiring")}
            >
              <div>
                <div className="font-medium">Job Opening</div>
                <div className="text-sm text-gray-600">Quick job post template</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCreate;

