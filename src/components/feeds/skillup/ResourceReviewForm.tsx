
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Usage: <ResourceReviewForm resourceId={resource.id} />
interface ResourceReviewFormProps {
  resourceId: string;
}
export default function ResourceReviewForm({ resourceId }: ResourceReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      setSubmitting(true);
      const { error } = await supabase.from("resource_reviews").insert([
        {
          resource_id: resourceId,
          user_id: user?.id,
          rating,
          content,
        },
      ]);
      setSubmitting(false);
      if (error) throw error;
    },
    onSuccess: () => {
      setContent("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["resource-reviews", resourceId] });
    },
  });

  if (!user) return null;

  return (
    <form
      className="my-4 space-y-2"
      onSubmit={e => {
        e.preventDefault();
        mutation.mutate();
      }}
    >
      <div className="flex items-center gap-2">
        <label htmlFor="rating" className="font-medium">
          Rating:
        </label>
        <select
          id="rating"
          className="border rounded px-2 py-1"
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          required
        >
          {[5, 4, 3, 2, 1].map(val => (
            <option key={val} value={val}>
              {val} Star{val > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <Textarea
        placeholder="Write your review here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full"
        minLength={2}
        maxLength={500}
        rows={3}
        required
      />
      <Button type="submit" disabled={submitting || !content.trim()}>
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
