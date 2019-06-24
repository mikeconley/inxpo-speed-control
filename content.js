const SpeedControl = {
  SPEEDS: {
    "1.0x": 1,
    "1.25x": 1.25,
    "1.5x": 1.5,
    "2.0x": 2,
  },

  init() {
    this.$controls = document.querySelector(".AxiomMediaBottomControls");
    this.$video = document.querySelector("video");

    if (!this.$controls) {
      // I guess this isn't the right kind of page.
      console.log("INXPO Speed Control can't attach to this page. Bailing out.");
    }

    this.$select = document.createElement("select");
    this.$select.addEventListener("change", this);

    let frag = document.createDocumentFragment();

    for (let speedStr in this.SPEEDS) {
      let option = document.createElement("option");
      option.textContent = speedStr;
      option.value = this.SPEEDS[speedStr];
      frag.appendChild(option);
    }

    // Gettin' lazy
    this.$select.style.marginLeft = "5px";
    this.$select.style.marginRight = "5px";

    this.$select.appendChild(frag);
    this.$controls.appendChild(this.$select);
  },

  handleEvent(event) {
    if (event.type !== "change") {
      return;
    }

    let newSpeed = event.target.value;
    console.log(`Setting playbackRate to ${newSpeed}`);
    this.$video.playbackRate = newSpeed;
  }
};

// be dumb and poll for video, but at least not forever
const POLLING = {
  duration: 250,
  iterations: 25,
  current: 1
};

const run = () => {
  console.log(`polling for video element...${POLLING.current} times`);
  if (POLLING.current > POLLING.iterations) {
    console.log("Can't find video element. Bailing out.");
  }
  setTimeout(() => {
    const video = document.querySelector('video');
    if (video) {
      SpeedControl.init();
    } else {
      POLLING.current++;
      run();
    }
  }, POLLING.duration);
};

run();
