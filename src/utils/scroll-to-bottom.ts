export default function scrollToBottom(maxAttempts = 60) {
  const initialHeight = document.documentElement.scrollHeight;
  let attempts = 0;

  const checkAndScroll = () => {
    attempts++;
    const currentHeight = document.documentElement.scrollHeight;

    if (currentHeight !== initialHeight) {
      window.scrollTo({ top: currentHeight });
    } else if (attempts < maxAttempts) {
      // Keep checking
      requestAnimationFrame(checkAndScroll);
    }
  };

  requestAnimationFrame(checkAndScroll);
}
