class NetworkListener {
  forcedOffline = false;

  forceOffline() {
    this.forcedOffline = true;

    dispatchEvent(new Event("offline"));
  }

  unforceOffline() {
    this.forcedOffline = false;

    dispatchEvent(new Event("online"));
  }

  async getIsOnline() {
    if (this.forcedOffline) return false;

    return navigator.onLine;
  }

  listen(callback: (isOnline: boolean) => void) {
    const onOnline = () => {
      console.log("online event detected");
      callback(true);
    };
    const onOffline = () => {
      console.log("offline event detected");
      callback(false);
    };

    addEventListener("online", onOnline);
    addEventListener("offline", onOffline);

    return () => {
      removeEventListener("online", onOnline);
      removeEventListener("offline", onOffline);
    };
  }
}

export default new NetworkListener();
