let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {

    const move = (x, y) => {
      if (!this.holdingPaper) return;

      const velX = x - this.prevMouseX;
      const velY = y - this.prevMouseY;

      this.currentPaperX += velX;
      this.currentPaperY += velY;

      this.prevMouseX = x;
      this.prevMouseY = y;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
    };

    // MOUSE
    paper.addEventListener("mousedown", (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;

      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    document.addEventListener("mousemove", (e) => {
      move(e.clientX, e.clientY);
    });

    document.addEventListener("mouseup", () => {
      this.holdingPaper = false;
    });

    // TOUCH
    paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];

      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;

      this.prevMouseX = touch.clientX;
      this.prevMouseY = touch.clientY;
    });

    document.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      move(touch.clientX, touch.clientY);
    });

    document.addEventListener("touchend", () => {
      this.holdingPaper = false;
    });
  }
}

document.querySelectorAll(".paper").forEach(paper => {
  new Paper().init(paper);
});