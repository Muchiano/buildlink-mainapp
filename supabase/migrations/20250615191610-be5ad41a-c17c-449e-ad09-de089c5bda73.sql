
-- 1. Table for Direct Messaging (1:1 chat)
CREATE TABLE IF NOT EXISTS public.direct_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  content TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  read BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;

-- Allow sender or recipient to read their messages
CREATE POLICY "Users can select their own messages"
  ON public.direct_messages
  FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Allow sender to insert messages
CREATE POLICY "Users can insert their own outgoing messages"
  ON public.direct_messages
  FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Sender can update their message (e.g., mark as read)
CREATE POLICY "Users can update their own sent messages"
  ON public.direct_messages
  FOR UPDATE
  USING (auth.uid() = sender_id);

-- Recipient can mark as read
CREATE POLICY "Recipient can mark as read"
  ON public.direct_messages
  FOR UPDATE
  USING (auth.uid() = recipient_id);

-- Allow sender/recipient to delete their own messages
CREATE POLICY "Users can delete own messages"
  ON public.direct_messages
  FOR DELETE
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

--------------------------------------------------------

-- 2. Table for User Follows/Connections
CREATE TABLE IF NOT EXISTS public.connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,         -- the user who initiates the connection
  connected_user_id UUID NOT NULL, -- the user who is being followed/connected to
  status TEXT NOT NULL DEFAULT 'pending', -- pending/accepted/blocked etc
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

-- Users can see their own connections
CREATE POLICY "Users can select own connections"
  ON public.connections
  FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = connected_user_id);

-- Users can request new connections
CREATE POLICY "Users can insert connections they initiate"
  ON public.connections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Either side can update connection (e.g., accepting/declining)
CREATE POLICY "Users can update their own connection status"
  ON public.connections
  FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = connected_user_id);

-- Users can delete their own connection records
CREATE POLICY "Users can delete own connections"
  ON public.connections
  FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = connected_user_id);

--------------------------------------------------------

-- 3. Storage Bucket for Post Media
insert into storage.buckets (id, name, public) values ('post-media', 'post-media', true)
on conflict (id) do nothing;

-- Make post-media public for uploads
-- This bucket's policy is public for read. (Write will be restricted to authenticated users via client config)
