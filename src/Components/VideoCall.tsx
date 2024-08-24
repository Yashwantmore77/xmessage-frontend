import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { Button, Container, Typography, Box, Paper } from '@mui/material';

const VideoCall: React.FC = () => {
  const [showVideos, setShowVideos] = useState<boolean>(false);
  const socket = useRef(io('http://127.0.0.1:5000')).current;
  const userVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    const handleSignal = (data: any) => {
      if (peerRef.current) {
        peerRef.current.signal(data.signal);
      }
    };

    const initCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }

        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });

        peer.on('signal', (signal: Peer.SignalData) => {
          socket.emit('signal', { signal });
        });

        peer.on('stream', (remoteStream: MediaStream) => {
          if (peerVideo.current) {
            peerVideo.current.srcObject = remoteStream;
          }
        });

        peer.on('error', (err: any) => {
          console.error('Peer connection error:', err);
        });

        peerRef.current = peer;

        socket.on('signal', handleSignal);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    if (showVideos) {
      initCall();
    }

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      socket.off('signal', handleSignal);
      socket.disconnect();
    };
  }, [showVideos, socket]);

  const endCall = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    socket.disconnect();
    setShowVideos(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Video Call
        </Typography>
        {!showVideos ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowVideos(true)}
            sx={{ mb: 2 }}
          >
            Start Video Call
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={endCall}
              sx={{ mb: 2 }}
            >
              End Call
            </Button>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  width: '300px',
                  height: 'auto',
                }}
              >
                <Typography variant="subtitle1">Your Video</Typography>
                <video
                  ref={userVideo}
                  autoPlay
                  muted
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Paper>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  width: '300px',
                  height: 'auto',
                }}
              >
                <Typography variant="subtitle1">Peer Video</Typography>
                <video
                  ref={peerVideo}
                  autoPlay
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Paper>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default React.memo(VideoCall);
