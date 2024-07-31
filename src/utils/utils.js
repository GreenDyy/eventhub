const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    // Đảm bảo rằng giây luôn có 2 chữ số
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    
    return `${minutes}:${formattedSeconds}`;
  };

  export {
    formatTime,
  }