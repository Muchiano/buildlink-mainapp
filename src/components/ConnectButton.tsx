
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { connectionsService } from "@/services/connectionsService";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface ConnectButtonProps {
  targetUserId: string;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ targetUserId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [status, setStatus] = useState<"not_connected" | "pending" | "accepted" | "loading">("loading");
  const [reqId, setReqId] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    if (!user) return;
    setStatus("loading");
    const { data, error } = await connectionsService.getConnectionStatus(user.id, targetUserId);
    if (error) {
      toast({ title: "Failed to load connection", description: error.message, variant: "destructive" });
      setStatus("not_connected");
      return;
    }
    if (!data) {
      setStatus("not_connected");
    } else if (data.status === "pending") {
      setReqId(data.id);
      setStatus("pending");
    } else if (data.status === "accepted") {
      setStatus("accepted");
    }
  }, [user, targetUserId, toast]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleConnect = async () => {
    if (!user) return;
    setStatus("loading");
    const { data, error } = await connectionsService.connect(user.id, targetUserId);
    if (error) {
      toast({ title: "Failed to send connection", description: error.message, variant: "destructive" });
      setStatus("not_connected");
    } else {
      setReqId(data.id);
      setStatus("pending");
      toast({ title: "Request sent", description: "Connection request sent!" });
    }
  };

  const handleAccept = async () => {
    if (!reqId) return;
    setStatus("loading");
    const { error } = await connectionsService.acceptRequest(reqId);
    if (error) {
      toast({ title: "Failed to accept connection", description: error.message, variant: "destructive" });
    } else {
      setStatus("accepted");
      toast({ title: "Connected", description: "You're now connected!" });
    }
  };

  if (user?.id === targetUserId) return null;

  if (status === "loading") return <Button disabled>Loading...</Button>;
  if (status === "not_connected") return <Button onClick={handleConnect}>Connect</Button>;
  if (status === "pending") return (
    <Button onClick={handleAccept} variant="outline">
      Accept Connection
    </Button>
  );
  if (status === "accepted") return <Button disabled>Connected</Button>;
  return null;
};

export default ConnectButton;
