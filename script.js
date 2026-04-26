const flowersHost = document.getElementById("flowers");
const bouquet = document.getElementById("bouquet");
const scene = document.getElementById("scene");
const petalRain = document.getElementById("petalRain");
const sparkleLayer = document.getElementById("sparkleLayer");
const surpriseBtn = document.getElementById("surpriseBtn");
const messageBtn = document.getElementById("messageBtn");
const loveNote = document.getElementById("loveNote");

const flowersData = [
  {
    color: "white",
    x: "-130px",
    height: "332px",
    size: "92px",
    tilt: "-12deg",
    delay: "0s",
    z: 6,
  },
  {
    color: "red",
    x: "-72px",
    height: "354px",
    size: "88px",
    tilt: "-8deg",
    delay: "0.18s",
    z: 7,
  },
  {
    color: "white",
    x: "-8px",
    height: "382px",
    size: "98px",
    tilt: "-2deg",
    delay: "0.3s",
    z: 9,
  },
  {
    color: "red",
    x: "52px",
    height: "360px",
    size: "92px",
    tilt: "4deg",
    delay: "0.08s",
    z: 8,
  },
  {
    color: "white",
    x: "108px",
    height: "328px",
    size: "86px",
    tilt: "8deg",
    delay: "0.25s",
    z: 6,
  },
  {
    color: "red",
    x: "-166px",
    height: "286px",
    size: "76px",
    tilt: "-18deg",
    delay: "0.14s",
    z: 4,
  },
  {
    color: "white",
    x: "162px",
    height: "280px",
    size: "74px",
    tilt: "18deg",
    delay: "0.35s",
    z: 4,
  },
  {
    color: "red",
    x: "-108px",
    height: "248px",
    size: "72px",
    tilt: "-11deg",
    delay: "0.4s",
    z: 3,
  },
  {
    color: "white",
    x: "114px",
    height: "242px",
    size: "70px",
    tilt: "12deg",
    delay: "0.46s",
    z: 3,
  },
];

function createFlower(data) {
  const flower = document.createElement("div");
  flower.className = `flower ${data.color}`;
  flower.style.setProperty("--x", data.x);
  flower.style.setProperty("--height", data.height);
  flower.style.setProperty("--size", data.size);
  flower.style.setProperty("--tilt", data.tilt);
  flower.style.setProperty("--delay", data.delay);
  flower.style.zIndex = data.z;

  const outerPetals = Array.from({ length: 8 }, (_, index) => {
    return `<span class="petal outer" style="--i:${index};"></span>`;
  }).join("");

  const innerPetals = Array.from({ length: 5 }, (_, index) => {
    return `<span class="petal inner" style="--i:${index};"></span>`;
  }).join("");

  flower.innerHTML = `
    <div class="stem"></div>
    <div class="leaf left"></div>
    <div class="leaf right"></div>
    <div class="bloom">
      ${outerPetals}
      ${innerPetals}
      <span class="core"></span>
    </div>
  `;

  flower.addEventListener("click", (event) => {
    event.stopPropagation();
    pulseFlower(flower);
    burstPetals(16, data.color);
    loveNote.classList.add("open");
  });

  return flower;
}

function pulseFlower(flower) {
  flower.classList.remove("pop");
  void flower.offsetWidth;
  flower.classList.add("pop");
}

function buildBouquet() {
  flowersData.forEach((data) => {
    flowersHost.appendChild(createFlower(data));
  });
}

function buildSparkles() {
  Array.from({ length: 18 }, () => {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${10 + Math.random() * 78}%`;
    sparkle.style.top = `${8 + Math.random() * 55}%`;
    sparkle.style.setProperty("--delay", `${Math.random() * 4}s`);
    sparkle.style.setProperty("--twinkle", `${2.6 + Math.random() * 2.6}s`);
    sparkleLayer.appendChild(sparkle);
  });
}

function burstPetals(count = 28, preferredColor = null) {
  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement("span");
    const color = preferredColor || (Math.random() > 0.5 ? "red" : "white");

    petal.className = `falling-petal ${color}`;
    petal.style.left = `${12 + Math.random() * 76}%`;
    petal.style.animationDuration = `${4.8 + Math.random() * 2.4}s`;
    petal.style.animationDelay = `${Math.random() * 0.35}s`;
    petal.style.setProperty("--drift", `${-220 + Math.random() * 440}px`);
    petal.style.setProperty("--spin-end", `${180 + Math.random() * 540}deg`);
    petal.style.setProperty("--scale", `${0.65 + Math.random() * 0.8}`);

    petalRain.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove(), {
      once: true,
    });
  }
}

function pulseRandomFlowers(count = 4) {
  const flowers = [...document.querySelectorAll(".flower")];

  flowers
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .forEach((flower, index) => {
      window.setTimeout(() => pulseFlower(flower), index * 120);
    });
}

scene.addEventListener("mousemove", (event) => {
  const rect = scene.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  bouquet.style.transform = `translateX(-50%) rotateX(${4 - y * 5}deg) rotateY(${x * 12}deg)`;
});

scene.addEventListener("mouseleave", () => {
  bouquet.style.transform = "translateX(-50%) rotateX(4deg) rotateY(0deg)";
});

bouquet.addEventListener("click", () => {
  loveNote.classList.add("open");
  burstPetals(26);
  pulseRandomFlowers(5);
});

surpriseBtn.addEventListener("click", () => {
  burstPetals(36);
  pulseRandomFlowers(6);
});

messageBtn.addEventListener("click", () => {
  loveNote.classList.toggle("open");
});

buildBouquet();
buildSparkles();

window.setTimeout(() => {
  burstPetals(18);
}, 700);
